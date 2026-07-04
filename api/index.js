import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

function getSettings() {
  return {
    provider: process.env.VITE_AI_PROVIDER || 'groq',
    apiKey: process.env.AI_API_KEY || process.env.VITE_AI_API_KEY || '',
    model: process.env.VITE_AI_MODEL
  };
}

// Ensure error responses have a consistent shape so frontend can fallback easily
const mockRequiredResponse = { error: 'mockRequired', message: 'API key not configured or API request failed. Falling back to mock.' };

// Note: Netlify functions by default don't mount at the app root compared to regular express,
// so depending on the rewrite rule, we might mount the routes without /api/ base.
// But if rewrite sends /api/* to /.netlify/functions/api/api/*, we'd need to match that.
// Let's use the router mounted at /api/ so it behaves identical locally and via redirect.
// For Vercel, it routes traffic natively to this module if placed in api/ folder.
const router = express.Router();

router.get('/ai/status', (req, res) => {
  const { apiKey } = getSettings();
  res.json({ isConfigured: !!(apiKey && apiKey.trim().length > 0) });
});

router.get('/test', (req, res) => {
  const settings = getSettings();
  res.json({ 
    status: 'Vercel API is reached!',
    provider: settings.provider,
    hasKey: !!settings.apiKey,
    envKeysAvailable: Object.keys(process.env).filter(k => k.includes('AI') || k.includes('VITE_AI'))
  });
});

router.post('/ai/chat', async (req, res) => {
  const { history, patientData } = req.body;
  const settings = getSettings();

  if (!settings.apiKey) {
    return res.status(503).json(mockRequiredResponse);
  }

  try {
    let result = '';
    if (settings.provider === 'openai') {
      result = await callOpenAIApi(history, patientData, settings);
    } else if (settings.provider === 'gemini') {
      result = await callGeminiApi(history, patientData, settings);
    } else if (settings.provider === 'groq') {
      result = await callGroqApi(history, patientData, settings);
    } else {
      throw new Error('Unsupported provider: ' + settings.provider);
    }
    res.json({ result });
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(503).json({ error: 'realError', message: err.message });
  }
});

router.post('/ai/analyze-report', async (req, res) => {
  const { text } = req.body;
  const settings = getSettings();

  if (!settings.apiKey) {
    return res.status(503).json(mockRequiredResponse);
  }

  const prompt = `Analyze this clinical health report. Structure the output as valid JSON matching this schema exactly:
{
  "keyFindings": ["finding 1", "finding 2"],
  "concerns": ["concern 1"],
  "avoid": ["food to avoid 1"],
  "include": ["food to include 1"],
  "alerts": ["urgent health alert if any"]
}
Text to analyze:
${text}

Respond ONLY with the raw JSON object, no markdown blocks.`;

  try {
    let responseText = await callSinglePrompt(prompt, settings, 'You are an expert clinical nutrition parser.');
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    } else {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    
    const data = JSON.parse(responseText);
    res.json({
      keyFindings: data.keyFindings || [],
      concerns: data.concerns || [],
      avoid: data.avoid || [],
      include: data.include || [],
      alerts: data.alerts || []
    });
  } catch (err) {
    console.error('AI Analyze Error:', err.message);
    res.status(503).json(mockRequiredResponse);
  }
});

router.post('/ai/generate-diet-chart', async (req, res) => {
    const { patient, dayCount } = req.body;
    const settings = getSettings();
  
    if (!settings.apiKey) {
      return res.status(503).json(mockRequiredResponse);
    }
  
    const prompt = `Generate a ${dayCount}-day clinical diet plan for this patient.
    Patient data: ${JSON.stringify(patient)}
    Return ONLY valid JSON matching this schema exactly (no markdown blocks):
    {
      "hydrationTarget": "3.0 Liters / Day",
      "foodsToAvoid": "list of CSV strings",
      "foodsToInclude": "list of CSV strings",
      "lifestyle": ["tip 1", "tip 2"],
      "doctorNotes": "clinical note",
      "days": [
        {
          "day": "Day 1",
          "meals": [
            { "time": "06:30 AM", "meal": "Wake-up Drink", "foodOptions": "...", "portion": "...", "notes": "..." }
          ]
        }
      ]
    }`;
  
    try {
      let responseText = await callSinglePrompt(prompt, settings, 'You are an expert clinical dietitian.');
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        responseText = jsonMatch[0];
      } else {
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      const data = JSON.parse(responseText);
      
      res.json({
        patientId: patient.id,
        patientName: patient.name,
        bmi: patient.bmi,
        bmiCategory: patient.bmiCategory,
        goal: patient.goal,
        ...data
      });
    } catch (err) {
      console.error('AI Diet Error:', err.message);
      res.status(503).json(mockRequiredResponse);
    }
});

// Catch-all mapping for Vercel's aggressive path rewriting
app.use(router);           // matches /ai/chat
app.use('/api', router);   // matches /api/ai/chat
app.use('/api/index.js', router); // matches Vercel internal path

// Helper API calls using global fetch
async function callSinglePrompt(prompt, settings, systemInstruction) {
  const history = [{ sender: 'user', text: prompt }];
  if (settings.provider === 'openai') {
    return await callOpenAIApi(history, null, settings, systemInstruction);
  } else if (settings.provider === 'gemini') {
    return await callGeminiApi(history, null, settings, systemInstruction);
  } else if (settings.provider === 'groq') {
    return await callGroqApi(history, null, settings, systemInstruction);
  }
  throw new Error('Unsupported provider');
}

async function callOpenAIApi(history, patientData, settings, systemOverride) {
    const sysPrompt = systemOverride || `You are Dr. Afreen Fathima's clinical nutrition assistant. Keep advice safe, culturally suitable, and specific to the patient profile. Do not prescribe medicines or diagnose. Always state that this plan is a draft requiring review by Dr. Afreen Fathima. Profile context: ${JSON.stringify(patientData || {})}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model || "gpt-4o-mini",
        messages: [
          { role: "system", content: sysPrompt },
          ...history.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))
        ]
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
}

async function callGeminiApi(history, patientData, settings, systemOverride) {
    const model = settings.model || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${settings.apiKey}`;
    
    const sysPrompt = systemOverride || `You are Dr. Afreen Fathima's nutrition assistant. Provide clinical nutrition guidance.
    Patient context: ${JSON.stringify(patientData || {})}
    Guidelines:
    - Do not diagnose or prescribe medicine.
    - Recommend foods native to the patient's region.
    - Warn against allergens.
    - Final decisions rest with Dr. Afreen Fathima.`;
    
    const contents = history.map(msg => ({
       role: msg.sender === 'user' ? 'user' : 'model',
       parts: [{ text: msg.text }]
    }));
  
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sysPrompt }] },
        contents: contents
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
}

async function callGroqApi(history, patientData, settings, systemOverride) {
    const sysPrompt = systemOverride || `You are Dr. Afreen Fathima's clinical nutrition assistant. Final plan must be reviewed by the doctor. Context: ${JSON.stringify(patientData || {})}`;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model || "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: sysPrompt },
          ...history.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))
        ]
      })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
}

export default function handler(req, res) { return app(req, res); }
