
async function test() {
  try {
    const response = await fetch("http://localhost:8888/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: [{ sender: 'user', text: 'Hello, what is your name?' }],
        patientData: {}
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
