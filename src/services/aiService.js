import { regionalFoods } from '../data/regionalFoods';

/**
 * Advanced Keyword-based Clinic Analyzer
 * Extracts clinical flags and health markers from raw text reports.
 */
export function localNlpAnalyzeReport(text) {
  if (!text || text.trim().length === 0) {
    return {
      keyFindings: ["No text extracted. Please type or edit the report content manually."],
      concerns: ["Awaiting medical scan data."],
      avoid: [],
      include: [],
      alerts: []
    };
  }

  const normalized = text.toLowerCase();
  const findings = [];
  const concerns = [];
  const avoid = [];
  const include = [];
  const alerts = [];

  // 1. Diabetes / Blood Sugar Check
  if (normalized.includes("hba1c") || normalized.includes("sugar") || normalized.includes("glucose") || normalized.includes("diabetes")) {
    // Extract actual numeric value if possible
    const glucoseMatch = normalized.match(/(?:glucose|sugar|fasting|hba1c)[^\d]*(\d+(?:\.\d+)?)/);
    let valStr = "";
    if (glucoseMatch && glucoseMatch[1]) {
      valStr = ` (${glucoseMatch[1]})`;
      const numVal = parseFloat(glucoseMatch[1]);
      if (normalized.includes("hba1c")) {
        if (numVal >= 6.5) {
          findings.push(`Elevated HbA1c detected: ${numVal}% (Diabetic range)`);
          alerts.push("HbA1c level is elevated. Urgent medical review recommended for insulin scaling.");
        } else if (numVal >= 5.7) {
          findings.push(`HbA1c of ${numVal}% indicates Prediabetes`);
        } else {
          findings.push(`Healthy HbA1c: ${numVal}%`);
        }
      } else {
        if (numVal > 125) {
          findings.push(`Elevated Fasting Glucose: ${numVal} mg/dL`);
          alerts.push("Fasting blood sugar is high. Review medication timings.");
        }
      }
    } else {
      findings.push("Keywords suggest abnormal glucose metabolism or diabetes markers.");
    }
    concerns.push("Impaired glucose tolerance / Insulin resistance.");
    avoid.push("Refined sugars, high-carb white rice, white bread, sweet bakery items, sweet soda, and high GI fruits (mango, grapes).");
    include.push("High-fiber whole grains (ragi, barley, oats), leafy greens, bitter gourd, cinnamon water, fenugreek seeds, and lean proteins.");
  }

  // 2. Thyroid TSH Check
  if (normalized.includes("tsh") || normalized.includes("thyroid") || normalized.includes("t3") || normalized.includes("t4")) {
    const tshMatch = normalized.match(/(?:tsh|thyroid)[^\d]*(\d+(?:\.\d+)?)/);
    if (tshMatch && tshMatch[1]) {
      const numVal = parseFloat(tshMatch[1]);
      if (numVal > 4.5) {
        findings.push(`High TSH detected: ${numVal} uIU/mL (Hypothyroidism marker)`);
        concerns.push("Hypothyroidism / Slow metabolism.");
        avoid.push("Soy products, unfermented cruciferous vegetables (raw cabbage, broccoli, cauliflower) in large quantities, and processed foods.");
        include.push("Iodized salt, selenium-rich brazil nuts, zinc sources (pumpkin seeds), eggs, organic poultry, and fiber-rich lentils.");
      } else if (numVal < 0.4) {
        findings.push(`Low TSH detected: ${numVal} uIU/mL (Hyperism marker)`);
        concerns.push("Hyperthyroidism.");
      } else {
        findings.push(`Normal TSH range: ${numVal} uIU/mL`);
      }
    } else {
      findings.push("Thyroid-related identifiers detected.");
      concerns.push("Hormonal thyroid axis evaluation required.");
      avoid.push("Gluten, excess soy, high caffeine");
      include.push("Pumpkin seeds, sunflower seeds, fish, sea vegetables");
    }
  }

  // 3. Cholesterol & Heart Check
  if (normalized.includes("cholesterol") || normalized.includes("ldl") || normalized.includes("triglycerides") || normalized.includes("lipid") || normalized.includes("tg")) {
    findings.push("Lipid panel reveals dyslipidemia indicators.");
    concerns.push("Elevated cardiovascular risk factors, excess saturated fat level.");
    avoid.push("Deep-fried snacks (samosas, pakoras), butter, ghee, red meat, saturated palm oil, trans-fat bakery items.");
    include.push("Oats bran, garlic, walnuts, almonds, flaxseeds, olive oil in moderation, warm water with lemon, baked fish (omega-3).");
    
    if (normalized.includes("ldl") || normalized.includes("triglycerides")) {
      const tgMatch = normalized.match(/(?:triglycerides|tg|ldl)[^\d]*(\d+)/);
      if (tgMatch && tgMatch[1]) {
        const numVal = parseInt(tgMatch[1], 10);
        if (numVal > 150) {
          findings.push(`High triglycerides/LDL detected: ${numVal} mg/dL`);
          if (numVal > 300) {
            alerts.push("Severe cholesterol elevation. High risk of cardiovascular strain. Immediate dietitian intervention required.");
          }
        }
      }
    }
  }

  // 4. Anemia / Hemoglobin
  if (normalized.includes("hemoglobin") || normalized.includes("hb ") || normalized.includes("iron") || normalized.includes("anemia")) {
    const hbMatch = normalized.match(/(?:hemoglobin|hb)[^\d]*(\d+(?:\.\d+)?)/);
    if (hbMatch && hbMatch[1]) {
      const numVal = parseFloat(hbMatch[1]);
      if (numVal < 11.5) {
        findings.push(`Low Hemoglobin level (Anemia marker): ${numVal} g/dL`);
        concerns.push("Iron deficiency anemia.");
        avoid.push("Drinking tea or coffee immediately with meals (inhibits iron absorption), foods high in calcium at the same time as iron inputs.");
        include.push("Green leafy vegetables (spinach/keerai), beetroot juice, pomegranate, dates, black raisins, organ meats, sesame seeds, Vitamin C fruits (lemon/amla) to aid absorption.");
      } else {
        findings.push(`Normal range Hemoglobin: ${numVal} g/dL`);
      }
    } else {
      findings.push("Anemia key concepts identified in the lab values.");
      concerns.push("Iron storage levels.");
      include.push("Beetroot, dates, spinach, Vitamin C sources.");
    }
  }

  // 5. Vitamin D & Vitamin B12 Deficiencies
  if (normalized.includes("vitamin d") || normalized.includes("vit d") || normalized.includes("25-hydroxy") || normalized.includes("d3")) {
    findings.push("Vitamin D (25-OH) analysis detected.");
    const vitDMatch = normalized.match(/(?:d3|d|25-hydroxy)[^\d]*(\d+(?:\.\d+)?)/);
    if (vitDMatch && vitDMatch[1]) {
      const numVal = parseFloat(vitDMatch[1]);
      if (numVal < 30) {
        findings.push(`Insufficient Vitamin D: ${numVal} ng/mL (Deficient if <20)`);
        concerns.push("Hypovitaminosis D, compromised bone mineralization.");
        include.push("Egg yolks, mushrooms exposed to UV, fortified milks, early morning safe sun exposure, doctor-prescribed cholecalciferol supplements.");
      }
    }
  }

  if (normalized.includes("b12") || normalized.includes("cobalamin")) {
    findings.push("Vitamin B12 evaluation markers found.");
    const b12Match = normalized.match(/(?:b12|cobalamin)[^\d]*(\d+)/);
    if (b12Match && b12Match[1]) {
      const numVal = parseInt(b12Match[1], 10);
      if (numVal < 200) {
        findings.push(`Vitamin B12 deficiency detected: ${numVal} pg/mL`);
        concerns.push("Neurological fatigue risks, poor red blood cell division.");
        include.push("Yogurt, milk, fortified breakfast cereals, nutritional yeast, or supplementations for strict vegans.");
      }
    }
  }

  // 6. Blood Pressure
  if (normalized.includes("bp ") || normalized.includes("blood pressure") || normalized.includes("systolic") || normalized.includes("diastolic")) {
    findings.push("Blood pressure measurement referenced.");
    const bpMatch = normalized.match(/(?:bp|pressure)[^\d]*(\d+)\s*\/\s*(\d+)/);
    if (bpMatch && bpMatch[1] && bpMatch[2]) {
      const sys = parseInt(bpMatch[1], 10);
      const dia = parseInt(bpMatch[2], 10);
      if (sys > 139 || dia > 89) {
        findings.push(`Hypertension alert: ${sys}/${dia} mmHg`);
        concerns.push("Elevated Blood Pressure.");
        avoid.push("High sodium pickles, papads, packaged chips, added table salt, processed canned goods, carbonated mineral sodas.");
        include.push("Potassium-rich foods (bananas, coconut water if kidneys are healthy), garlic extract, hibiscus tea, fiber.");
        if (sys > 160 || dia > 100) {
          alerts.push(`Critical hypertensive reading: ${sys}/${dia}. Dr. Afreen review is urgent.`);
        }
      }
    }
  }

  // Clean empty values
  if (findings.length === 0) {
    findings.push("Report text scanned. Vitals are within standard margins or require clinical review.");
  }
  if (concerns.length === 0) {
    concerns.push("General wellness screening.");
  }

  return {
    keyFindings,
    concerns,
    avoid: [...new Set(avoid)],
    include: [...new Set(include)],
    alerts
  };
}

/**
 * Rule-Based Smart Diet Plan Creator (Demo Mode Engine)
 * Takes patient config and dynamically structures a 1/3/7-day table.
 */
export function generateLocalDietChart(patient) {
  const {
    name = "Patient",
    gender = "General",
    bmi = 22,
    goal = "general_wellness",
    region = "global",
    foodPreference = "non-vegetarian",
    likes = "",
    dislikes = "",
    allergies = "",
    conditions = [],
    labValues = {}
  } = patient;

  // Retrieve regional dataset
  const regionKey = region.toLowerCase().replace(/[\s-]/g, "_");
  const dataset = regionalFoods[regionKey] || regionalFoods.global;
  
  // Custom meal timings
  const mealSlots = [
    { slot: "Wake-up Drink", key: "wakeUp" },
    { slot: "Breakfast", key: "breakfast" },
    { slot: "Mid-morning Snack", key: "midMorning" },
    { slot: "Lunch", key: "lunch" },
    { slot: "Evening Snack", key: "eveningSnack" },
    { slot: "Dinner", key: "dinner" },
    { slot: "Bedtime Option", key: "bedtime" }
  ];

  // Logic to filter options based on preferences and medical suitability
  const getSuitableMeal = (mealKey, dayIndex) => {
    let list = dataset[mealKey] || [];
    if (list.length === 0) {
      list = regionalFoods.global[mealKey] || [];
    }

    // 1. Filter by non-veg/veg preference
    const isVeg = ["vegetarian", "veg", "jain", "vegan", "eggitarian"].includes(foodPreference.toLowerCase());
    const isVegan = foodPreference.toLowerCase() === "vegan";
    const isEggitarian = foodPreference.toLowerCase() === "eggitarian";

    let filtered = list.filter(item => {
      const desc = item.food.toLowerCase();
      
      // If patient is vegetarian, remove meat/chicken/fish/seafood
      if (isVeg) {
        const meatTerms = ["chicken", "mutton", "fish", "meat", "salmon", "pomfret", "mackerel", "turkey", "egg"];
        if (meatTerms.some(term => desc.includes(term))) {
          // Exception: Eggs allowed for eggitarian
          if (isEggitarian && desc.includes("egg") && !desc.includes("chicken") && !desc.includes("fish")) {
            return true;
          }
          return false;
        }
      }

      // If vegan, remove egg AND dairy (milk, paneer, curd, yogurt, buttermilk, ghee, lassi, raita, moru, kootu containing milk)
      if (isVegan) {
        const dairyMeatTerms = ["chicken", "mutton", "fish", "meat", "salmon", "egg", "milk", "paneer", "curd", "yogurt", "buttermilk", "lassi", "raita", "moru", "chaman", "cow's milk"];
        if (dairyMeatTerms.some(term => desc.includes(term))) {
          return false;
        }
      }

      // 2. Filter out allergies
      if (allergies && allergies.trim().length > 0) {
        const allergyWords = allergies.toLowerCase().split(",").map(w => w.trim());
        if (allergyWords.some(aWord => aWord.length > 2 && desc.includes(aWord))) {
          return false;
        }
      }

      // 3. Filter out dislikes
      if (dislikes && dislikes.trim().length > 0) {
        const dislikeWords = dislikes.toLowerCase().split(",").map(w => w.trim());
        if (dislikeWords.some(dWord => dWord.length > 2 && desc.includes(dWord))) {
          return false;
        }
      }

      // 4. Boost therapeutic suitability when matching medical goals
      // e.g. condition: "diabetes" -> favor items with therapeutic: ["diabetes_management"]
      return true;
    });

    // If everything got filtered out, fallback to original dataset list to prevent blank cells
    if (filtered.length === 0) {
      filtered = list;
    }

    // Pick item based on dayIndex to generate variety for multi-day plans
    const index = dayIndex % filtered.length;
    return filtered[index] || { food: "Fresh seasonal greens and steamed grain", portion: "1 portion", notes: "Fresh portion customized by doctor" };
  };

  // Build daily structure
  const buildDayPlan = (dayNum, dayIndex) => {
    return mealSlots.map(slot => {
      const match = getSuitableMeal(slot.key, dayIndex);
      return {
        time: getSlotTime(slot.key),
        meal: slot.slot,
        foodOptions: match.food,
        portion: match.portion,
        notes: match.notes
      };
    });
  };

  const daysPlans = [];
  return buildDayPlan(1, 0); // Default returns 1-day layout as array.
}

function getSlotTime(slotKey) {
  switch (slotKey) {
    case "wakeUp": return "06:30 AM";
    case "breakfast": return "08:30 AM";
    case "midMorning": return "11:00 AM";
    case "lunch": return "01:30 PM";
    case "eveningSnack": return "05:00 PM";
    case "dinner": return "08:00 PM";
    case "bedtime": return "10:00 PM";
    default: return "Flexible";
  }
}

/**
 * Generate 1, 3, or 7 Day Full Package charts
 */
export function localGenerateSmartTimelinePlan(patient, dayCount = 1) {
  const days = [];
  const startIdx = Math.floor(Math.random() * 5); // Add randomized seed for list variation

  for (let i = 0; i < dayCount; i++) {
    const dayName = `Day ${i + 1}`;
    const meals = generateLocalDietChart(patient); // In a fully robust engine, it would pass index matching `i`
    days.push({
      day: dayName,
      meals: meals.map((m, idx) => {
        // Retrieve fresh meal slot options modulated by day index
        const datasetKey = ["wakeUp", "breakfast", "midMorning", "lunch", "eveningSnack", "dinner", "bedtime"][idx];
        const regionStr = patient.region || "global";
        const regionKey = regionStr.toLowerCase().replace(/[\s-]/g, "_");
        const dataset = regionalFoods[regionKey] || regionalFoods.global;
        const list = dataset[datasetKey] || regionalFoods.global[datasetKey] || [];
        
        // Filter elements locally to vary recommendations
        const prefStr = patient.foodPreference || "non-vegetarian";
        const isVeg = ["vegetarian", "veg", "jain", "vegan", "eggitarian"].includes(prefStr.toLowerCase());
        const isVegan = prefStr.toLowerCase() === "vegan";
        
        let filtered = list.filter(item => {
          const desc = item.food.toLowerCase();
          if (isVeg) {
            const meats = ["chicken", "mutton", "fish", "meat", "salmon", "pomfret", "mackerel", "turkey", "egg"];
            if (meats.some(term => desc.includes(term))) return false;
          }
          if (isVegan) {
            const animal = ["chicken", "mutton", "fish", "meat", "salmon", "egg", "milk", "paneer", "curd", "yogurt", "buttermilk", "lassi", "raita", "moru", "chaman", "cow's milk"];
            if (animal.some(term => desc.includes(term))) return false;
          }
          if (patient.allergies && patient.allergies.toLowerCase().trim().includes(desc)) return false;
          return true;
        });

        if (filtered.length === 0) filtered = list;
        const picked = filtered[(i + startIdx + idx) % filtered.length];

        return {
          time: getSlotTime(datasetKey),
          meal: ["Wake-up Drink", "Breakfast", "Mid-morning Snack", "Lunch", "Evening Snack", "Dinner", "Bedtime Option"][idx],
          foodOptions: picked ? picked.food : m.foodOptions,
          portion: picked ? picked.portion : m.portion,
          notes: picked ? picked.notes : m.notes
        };
      })
    });
  }

  // Generate metadata-driven alerts & health guides
  const analysis = localNlpAnalyzeReport(patient.reportText || "");
  const bmiVal = parseFloat(patient.bmi) || 22;
  
  let lifestyleTips = [
    "Hydration: Aim for 2.5 - 3.5 liters of clean water daily.",
    "Sleep: Maintain 7-8 hours of sound sleep. Finish dinner at least 2 hours before bed.",
    "Activity: Integrate 30-45 minutes of brisk walking, resistance band workouts, or yoga."
  ];

  if (patient.goal === "diabetes_management" || analysis.keyFindings.some(f => f.includes("HbA1c"))) {
    lifestyleTips.unshift("Check fasting sugars once a week and maintain a food diary for Dr. Afreen.");
  }
  if (patient.goal === "weight_loss") {
    lifestyleTips.push("Do not skip breakfast; starvation slows thyroid metabolic rate and causes fat storing.");
  }

  return {
    patientId: patient.id,
    patientName: patient.name,
    bmi: patient.bmi,
    bmiCategory: patient.bmiCategory,
    goal: patient.goal,
    hydrationTarget: "3.0 Liters / Day",
    foodsToAvoid: analysis.avoid.length > 0 ? analysis.avoid.join(", ") : "Refined sugar, high-sodium chips, packaged foods, excessive oils, deep fried products.",
    foodsToInclude: analysis.include.length > 0 ? analysis.include.join(", ") : "Leafy greens, whole wheat, millets, sprouts, cucumber, almonds, walnuts.",
    lifestyle: lifestyleTips,
    doctorNotes: patient.conditions && patient.conditions.length > 0
      ? `Patient presents with ${patient.conditions.join(", ")}. Follow sodium and calorie restrictions closely.`
      : "Maintain calorie target. Report weight changes every fortnight.",
    days
  };
}

/**
 * Chatbot Consultation Intelligence Layer
 * Intercepts user chats and returns responsive assistance matching Dr. Afreen's persona.
 */
// --- Frontend Direct Groq AI Engine ---
// We hit the Groq LLM directly from the frontend to avoid Vercel Serverless firewall/timeout issues.

async function callDirectGroq(prompt, systemInstruction) {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('API key not configured in VITE_AI_API_KEY');
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
}

export async function queryHealthChatbot(history, patientData) {
  const latestMessage = history[history.length - 1].text || "";
  
  try {
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    if (!apiKey) throw new Error("No API key");

    const sysPrompt = `You are Dr. Afreen Fathima's clinical nutrition assistant. Final plan must be reviewed by the doctor. Context: ${JSON.stringify(patientData || {})}`;
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
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
  } catch (err) {
    console.error("AI API Call failed, falling back to offline clinical parser:", err);
    // Offline simulation fallback logic below...
    const query = latestMessage.toLowerCase();
    if (query.includes("replace") || query.includes("instead of")) return "For a lower blood sugar index, substitute standard options with high fiber millets, quinoa, or tofu based on allergies.";
    if (query.includes("diabetes") || query.includes("sugar")) return "For diabetes, strict control of refined carbs (like white rice) is advised. Focus on complex jowar, methi seeds, and high protein.";
    return `I have recorded your query regarding "**${latestMessage}**". I will consult Dr. Afreen's guidelines and update the plan closely.`;
  }
}

export async function nlpAnalyzeReport(text) {
  try {
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

    let responseText = await callDirectGroq(prompt, "You are an expert clinical nutrition parser.");
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];
    else responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(responseText);
    return {
      keyFindings: data.keyFindings || [],
      concerns: data.concerns || [],
      avoid: data.avoid || [],
      include: data.include || [],
      alerts: data.alerts || []
    };
  } catch (err) {
    console.error("Analyze Report API failed, falling back local.", err);
    return localNlpAnalyzeReport(text);
  }
}

export async function generateSmartTimelinePlan(patient, dayCount = 1) {
  try {
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

    let responseText = await callDirectGroq(prompt, "You are an expert clinical dietitian.");
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) responseText = jsonMatch[0];
    else responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(responseText);
    return {
      patientId: patient.id,
      patientName: patient.name,
      bmi: patient.bmi,
      bmiCategory: patient.bmiCategory,
      goal: patient.goal,
      ...data
    };
  } catch (err) {
    console.error("Generate Diet API failed, falling back local.", err);
    return localGenerateSmartTimelinePlan(patient, dayCount);
  }
}
