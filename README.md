# Dr. Afreen Fathima Nutrition Assistant

An AI-powered clinical assistant web application designed for Dr. Afreen Fathima's nutrition and dietetics practice. The tool automates patient onboarding, extracts metrics from laboratory reports, generates personalized regional diet charts, and compiles printable medical-prescription sheets.

## 🚀 Technology Stack
*   **Frontend**: React (v19) + Vite (v8)
*   **Styling**: Tailwind CSS (v4) with CSS variables & print media layout
*   **Icons**: Lucide React
*   **Visualization**: Recharts (BMI distribution and statistics)
*   **Storage**: Client-Side Persistent LocalStorage

---

## ✨ Features
1.  **Welcome Panel**: Hero sections, AI Assistant cards, and quickCTAs.
2.  **Patient Form (Intake)**: Demographics, physical logs, and live BMI gauge metrics (Underweight, Normal, Overweight, Obese).
3.  **Report Scanner (OCR)**: Drag-and-drop file scanner with simulated OCR extraction. Includes predefined debug reports (Diabetes, Hypothyroid, Lipids, Severe Anemia) to allow instant click testing.
4.  **AI Assistant Chatbot**: Natural dialogue container prompting for missing data or answering inquiries (e.g. food replacements, recipe details, TSH explanations).
5.  **Diet Generator Sheet**: Grid workspace for 1, 3, and 7 days. Cell values are directly editable.
6.  **Saved Patients Index**: Dashboard highlighting active cases, contact lines, and statistics widgets.
7.  **Print Formatting**: Styled layout for physical print outputs displaying doctor branding and legal disclaimers.

---

## 🛠️ Installation & Setup

1.  **Clone / Download** this workshop directory:
    ```bash
    cd d:/bot
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start Local Hot-Reload server**:
    ```bash
    npm run dev
    ```
    This launches the application at `http://localhost:5173`. Open this URL in your web browser.

4.  **Production build compilation**:
    ```bash
    npm run build
    ```

---

## 💡 AI API Configuration & Sandbox
By default, the application runs in **Simulated Offline Engine (Demo Mode)**. It uses regular expression parsers to spot keywords (e.g., blood sugar levels or high cholesterol indicators) from reports and draws food recommendations from `src/data/regionalFoods.js`, modulating entries based on patient preferences, allergies, or dislikes. No external API key is needed.

To test live LLMs:
1.  Navigate to **Settings** folder via the sidebar.
2.  Select your API Provider (**Google Gemini**, **OpenAI**, or **Groq**).
3.  Paste your active API Secret Token.
4.  Click **Save Configuration Settings**. The chatbot will immediately start routing requests to the selected provider using the patient's medical history as context.
