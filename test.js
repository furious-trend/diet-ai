
async function test() {
  const settings = {
    apiKey: 'YOUR_API_KEY_HERE',
    model: 'gemini-2.5-flash'
  };
  
  const history = [{ sender: 'user', text: 'Hello' }];
  const sysPrompt = "You are a helpful assistant.";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`;
  
  const contents = history.map(msg => ({
     role: msg.sender === 'user' ? 'user' : 'model',
     parts: [{ text: msg.text }]
  }));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sysPrompt }] },
        contents: contents
      })
    });
    
    console.log("Status:", response.status);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

test();
