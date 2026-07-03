import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, HelpCircle, Eye, EyeOff } from 'lucide-react';

export default function Settings({ clinicSettings, onSaveSettings, onNotification }) {
  const [formData, setFormData] = useState({ ...clinicSettings });
  const [showKey, setShowKey] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    onNotification("Administration configuration saves updated.", "success");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 mb-6 select-text">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Practice & API Preferences</h2>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">Verify credentials, branding labels, and AI model parameters</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Clinic Branding */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinic Identity Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Doctor Name Label</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  placeholder="Dr. Afreen Fathima"
                  className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Clinic Name Label</label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleInputChange}
                  placeholder="Clinical Wellness Center"
                  className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Clinic Contact Phone</label>
                <input
                  type="text"
                  name="clinicPhone"
                  value={formData.clinicPhone}
                  onChange={handleInputChange}
                  placeholder="+91 9845X XXXXX"
                  className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Clinic Email</label>
                <input
                  type="email"
                  name="clinicEmail"
                  value={formData.clinicEmail}
                  onChange={handleInputChange}
                  placeholder="apollo.dietary@wellness.com"
                  className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Clinic Physical Address</label>
              <textarea
                name="clinicAddress"
                rows={2}
                value={formData.clinicAddress}
                onChange={handleInputChange}
                placeholder="4th block, Apollo Hospital Premises, Bangalore, India"
                className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium leading-relaxed resize-none"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Card 2: AI Dialogues */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assistant Customizations</h3>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Default Bot Greeting</label>
              <textarea
                name="assistantGreeting"
                rows={3}
                value={formData.assistantGreeting}
                onChange={handleInputChange}
                placeholder="Hello, I am Dr. Afreen Fathima's nutrition AI assistant..."
                className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium leading-relaxed resize-none"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Card 3: API Integration Tokens */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI API Integrations</h3>
              
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wider ${
                formData.apiKey ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {formData.apiKey ? 'API Active (Manual Mode)' : 'Demo Mode Active'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">AI API Provider</label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-205 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold text-slate-655 cursor-pointer"
                >
                  <option value="none">None / Simulated Offline Engine (Demo Mode)</option>
                  <option value="gemini">Google Gemini AI</option>
                  <option value="openai">OpenAI ChatGPT (GPT-4o-mini)</option>
                  <option value="groq">Groq Llama-3 Cloud</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1 flex items-center justify-between">
                  <span>Secret API Key Token</span>
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="text-teal-650 hover:text-teal-700 text-xxs font-bold lowercase flex items-center"
                  >
                    {showKey ? <EyeOff className="w-3 h-3 justify-center text-slate-450 mr-0.5" /> : <Eye className="w-3 h-3 justify-center text-slate-450 mr-0.5" />}
                    {showKey ? 'Hide key' : 'Show key'}
                  </button>
                </label>
                
                <input
                  type={showKey ? "text" : "password"}
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  placeholder={formData.provider === 'none' ? "API deactivated in Demo Mode" : "Paste your raw API key here..."}
                  disabled={formData.provider === 'none'}
                  className={`w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono ${
                    formData.provider === 'none' ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex items-start gap-3 mt-3 text-xxs leading-relaxed text-slate-500">
              <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
              <div>
                <p>When selecting **None / Simulated**, the assistant uses a structured, rule-based medical mapping system that compiles meals, counts local glycemic food constraints, and structures diagnostic report keywords entirely in-browser. This mode requires no API tokens, runs offline, and works instantly for demonstration purposes.</p>
              </div>
            </div>
          </div>

          {/* Submit Trigger */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-teal-605 hover:bg-teal-705 text-white bg-teal-600 hover:bg-teal-750 font-bold text-xs py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-teal-705/15 transition-all duration-200 cursor-pointer"
            >
              Save Configuration Settings
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
