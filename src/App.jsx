import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import PatientIntakeForm from './components/PatientIntakeForm';
import ReportUploader from './components/ReportUploader';
import ChatBot from './components/ChatBot';
import DietChartGenerator from './components/DietChartGenerator';
import PatientDashboard from './components/PatientDashboard';
import Settings from './components/Settings';
import DisclaimerBanner from './components/DisclaimerBanner';
import { X, Sparkles, HeartPulse, User } from 'lucide-react';

// Bootstrapped Clinical Cases for immediate playground testing
const BOOTSTRAP_PATIENTS = [
  {
    id: "pat_ramesh",
    name: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    phone: "+91 9845012345",
    email: "ramesh.kumar@gmail.com",
    region: "south_india",
    preferredLanguage: "Telugu & English",
    height: "172",
    weight: "85",
    bmi: 28.7,
    bmiCategory: "Overweight",
    waist: "39",
    activityLevel: "sedentary",
    occupation: "Bank Officer",
    sleepSchedule: "6 Hours (Late sleep)",
    waterIntake: "1.5 Liters",
    foodPreference: "vegetarian",
    likes: "Filter coffee, brown rice, idli",
    dislikes: "Cabbage, raw onions",
    allergies: "Peanuts",
    conditions: ["Diabetes Typ-2", "Hypertension"],
    medications: "Metformin 500mg (Post breakfast)",
    goal: "diabetes_management",
    mealTimingPreference: "Breakfast at 9 AM, Dinner after 9 PM",
    budgetLevel: "medium",
    cookingDifficulty: "moderate",
    labValues: {
      bloodSugarFasting: "168",
      hbA1c: "7.9",
      cholesterol: "210",
      triglycerides: "185",
      thyroidTsh: "1.8",
      hemoglobin: "14.1",
      vitaminD: "22",
      vitaminB12: "350",
      bloodPressure: "140/90"
    },
    reportText: "APOLLO DIAGNOSTICS LAB REPORT\nRamesh Kumar (52/M) | HbA1c: 7.9% | Fasting Glucose: 168 mg/dL | Triglycerides: 185 mg/dL",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "pat_sneha",
    name: "Sneha Reddy",
    age: 34,
    gender: "Female",
    phone: "+91 9900223344",
    email: "sneha.reddy@yahoo.com",
    region: "hyderabad",
    preferredLanguage: "Telugu",
    height: "160",
    weight: "68",
    bmi: 26.6,
    bmiCategory: "Overweight",
    waist: "34",
    activityLevel: "lightly active",
    occupation: "Homemaker",
    sleepSchedule: "7 Hours",
    waterIntake: "2 Liters",
    foodPreference: "non-vegetarian",
    likes: "Chicken curry, rice dosa, apples",
    dislikes: "Soya chunks, oats",
    allergies: "",
    conditions: ["Hypothyroid"],
    medications: "Thyronorm 50mcg (Fasting morning)",
    goal: "thyroid_support",
    mealTimingPreference: "Early meals preferred",
    budgetLevel: "medium",
    cookingDifficulty: "easy",
    labValues: {
      bloodSugarFasting: "92",
      hbA1c: "5.4",
      cholesterol: "190",
      triglycerides: "140",
      thyroidTsh: "6.8",
      hemoglobin: "12.0",
      vitaminD: "18.5",
      vitaminB12: "210",
      bloodPressure: "118/76"
    },
    reportText: "CLINICAL PATHOLOGY CARD\nSneha Reddy (34/F) | TSH: 6.8 uIU/mL | Vitamin D3: 18.5 ng/mL (Deficient)",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "pat_john",
    name: "John Miller",
    age: 46,
    gender: "Male",
    phone: "+1 415 555 6789",
    email: "john.miller@techcorp.com",
    region: "global",
    preferredLanguage: "English",
    height: "180",
    weight: "98",
    bmi: 30.2,
    bmiCategory: "Obese",
    waist: "42",
    activityLevel: "sedentary",
    occupation: "Software Lead",
    sleepSchedule: "6 Hours",
    waterIntake: "1.5 Liters",
    foodPreference: "non-vegetarian",
    likes: "Grilled steak, salmon, avocados",
    dislikes: "Ragi, local lentils",
    allergies: "Gluten",
    conditions: ["Hyperlipidemia", "Hypertension"],
    medications: "Atorvastatin 10mg (Night)",
    goal: "heart_health",
    mealTimingPreference: "Late night cravings snack",
    budgetLevel: "premium",
    cookingDifficulty: "advanced",
    labValues: {
      bloodSugarFasting: "115",
      hbA1c: "5.9",
      cholesterol: "245",
      triglycerides: "210",
      thyroidTsh: "1.2",
      hemoglobin: "14.8",
      vitaminD: "32",
      vitaminB12: "410",
      bloodPressure: "148/94"
    },
    reportText: "HEART SCREENING LOG\nJohn Miller (46/M) | Total Cholesterol: 245 mg/dL | LDL: 165 mg/dL | BP: 148/94 mmHg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_SETTINGS = {
  doctorName: "Dr. Afreen Fathima",
  clinicName: "Apollo Clinical Wellness Center",
  clinicPhone: "+91 98450 XXXXX",
  clinicEmail: "fathima.nutrition@apollo.com",
  clinicAddress: "4th Floor Wellness Wing, Apollo Hospital Premises, Jubilee Hills, Hyderabad, TS, India",
  assistantGreeting: "Hello, I am Dr. Afreen Fathima's nutrition AI assistant. I can help prepare customized diet plans, swap meals, explain blood reports, and check vitals. Please select a patient or ask a question.",
  provider: "none",
  apiKey: ""
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('dr_afreen_patients');
    return saved ? JSON.parse(saved) : BOOTSTRAP_PATIENTS;
  });

  const [clinicSettings, setClinicSettings] = useState(() => {
    const saved = localStorage.getItem('dr_afreen_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [activePatientId, setActivePatientId] = useState(() => {
    return patients.length > 0 ? patients[0].id : "";
  });

  const [editingPatient, setEditingPatient] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('dr_afreen_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('dr_afreen_settings', JSON.stringify(clinicSettings));
  }, [clinicSettings]);

  // Alert Manager
  const triggerNotification = (text, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text, type }]);
    
    // Auto clear after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // CRUD Patient Details
  const handleAddPatient = (patientData) => {
    if (editingPatient) {
      // Update
      setPatients(prev => prev.map(p => p.id === editingPatient.id ? { ...p, ...patientData } : p));
      setEditingPatient(null);
    } else {
      // Create new
      const newPatient = {
        ...patientData,
        id: `pat_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setPatients(prev => [newPatient, ...prev]);
      setActivePatientId(newPatient.id);
    }
    // Switch to Dashboard
    setCurrentTab('patients');
  };

  const handleDeletePatient = (id) => {
    setPatients(prev => prev.filter(p => p.id !== id));
    if (activePatientId === id) {
      setActivePatientId(patients.length > 0 ? patients[0].id : "");
    }
  };

  const handleEditPatientSelect = (p) => {
    setEditingPatient(p);
    setCurrentTab('form');
  };

  const handleSelectPatientToPlan = (id) => {
    setActivePatientId(id);
    setCurrentTab('diet');
  };

  const handleSavePatientChart = (id, dietChartData) => {
    setPatients(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          dietChart: dietChartData,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const handleReportAnalysisSave = (reportRawText, analysisResult) => {
    if (!activePatientId) {
      triggerNotification("No active patient selected. Analysis completed but not saved to a specific card.", "info");
      return;
    }

    setPatients(prev => prev.map(p => {
      if (p.id === activePatientId) {
        return {
          ...p,
          reportText: reportRawText,
          conditions: [...new Set([...p.conditions, ...analysisResult.concerns.filter(c => c !== "General wellness screening.")])],
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));

    triggerNotification("Extracted report parameters bound to Patient file.", "success");
  };

  const handleSaveSettings = (newSettings) => {
    setClinicSettings(newSettings);
  };

  const currentPatientObj = patients.find(p => p.id === activePatientId);

  return (
    <div className="flex bg-slate-50 min-h-screen relative font-sans text-slate-800">
      
      {/* Toast notifications portal */}
      <div className="fixed top-6 right-6 z-50 space-y-2 max-w-sm w-full no-print">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl shadow-lg border flex items-center justify-between gap-3 text-xs font-bold transition-all duration-300 transform translate-x-0 ${
              n.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-150' :
              n.type === 'warning' ? 'bg-amber-50 text-amber-800 border-amber-150' :
              n.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-150' :
              'bg-sky-50 text-sky-800 border-sky-150'
            }`}
          >
            <span>{n.text}</span>
            <button onClick={() => removeNotification(n.id)} className="text-slate-400 hover:text-slate-650 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Responsive Left Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          if (tab === 'form' && !editingPatient) {
            setEditingPatient(null);
          }
          setCurrentTab(tab);
        }} 
        clinicSettings={clinicSettings} 
      />

      {/* Main Core Container */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto print-container">
        
        {/* Top Header App Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 shrink-0 flex items-center justify-between no-print">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-850 uppercase tracking-widest">
              {currentTab === 'home' && "Practice Overview"}
              {currentTab === 'form' && (editingPatient ? "Modify Patient Chart" : "New Patient Intake")}
              {currentTab === 'report' && "Lab Report Analysis"}
              {currentTab === 'chat' && "AI Clinical Consult"}
              {currentTab === 'diet' && "Diet Chart generation"}
              {currentTab === 'patients' && "Registered Patient Index"}
              {currentTab === 'settings' && "Clinic Settings"}
            </h2>
            
            {/* Display active patient tag */}
            {currentPatientObj && currentTab !== 'home' && currentTab !== 'patients' && currentTab !== 'settings' && (
              <span className="text-[10px] font-bold bg-teal-50 border border-teal-200/50 text-teal-700 px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-teal-500 shrink-0" />
                <span>Context: {currentPatientObj.name}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Clinician Status</span>
              <span className="text-xs font-bold text-slate-750 block">{clinicSettings.doctorName}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-bold text-xs uppercase cursor-pointer">
              {clinicSettings.doctorName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Persistent Advisory Warning Ribbon */}
        <DisclaimerBanner />

        {/* Tab Canvas Content */}
        <div className="flex-1 p-8 print-container max-w-7xl w-full mx-auto">
          {currentTab === 'home' && (
            <HeroSection 
              setCurrentTab={setCurrentTab} 
              onSelectPatientToPlan={handleSelectPatientToPlan} 
              patients={patients}
            />
          )}

          {currentTab === 'form' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center no-print">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {editingPatient ? `Modify ${editingPatient.name}'s Profile` : "Register New Patient Record"}
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">Capture biometric, physical limits, diet targets, and laboratory values</p>
                </div>
                {editingPatient && (
                  <button
                    onClick={() => {
                      setEditingPatient(null);
                      setCurrentTab('patients');
                    }}
                    className="border border-slate-205 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg text-xxs font-bold cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
              
              <PatientIntakeForm 
                onAddPatient={handleAddPatient} 
                initialPatient={editingPatient}
                onNotification={triggerNotification}
              />
            </div>
          )}

          {currentTab === 'report' && (
            <ReportUploader 
              onAnalysisComplete={handleReportAnalysisSave} 
              initialText={currentPatientObj?.reportText || ""}
            />
          )}

          {currentTab === 'chat' && (
            <ChatBot 
              activePatient={currentPatientObj} 
              clinicSettings={clinicSettings}
            />
          )}

          {currentTab === 'diet' && (
            <DietChartGenerator 
              patients={patients} 
              activePatientId={activePatientId} 
              onSavePatientChart={handleSavePatientChart}
              onNotification={triggerNotification}
            />
          )}

          {currentTab === 'patients' && (
            <PatientDashboard 
              patients={patients} 
              onDeletePatient={handleDeletePatient} 
              onEditPatientSelect={handleEditPatientSelect}
              onSelectPatientToPlan={handleSelectPatientToPlan}
              onNotification={triggerNotification}
            />
          )}

          {currentTab === 'settings' && (
            <Settings 
              clinicSettings={clinicSettings} 
              onSaveSettings={handleSaveSettings}
              onNotification={triggerNotification}
            />
          )}
        </div>
      </main>
    </div>
  );
}
