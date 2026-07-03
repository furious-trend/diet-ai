import React from 'react';
import { 
  Sparkles, 
  UserPlus, 
  UploadCloud, 
  Users, 
  MapPin, 
  Printer, 
  ShieldCheck, 
  BadgeHelp,
  ArrowRight,
  HeartPulse
} from 'lucide-react';

export default function HeroSection({ setCurrentTab, onSelectPatientToPlan, patients }) {
  
  // Handlers to jump tabs
  const handleCreateNew = () => setCurrentTab('form');
  const handleUpload = () => setCurrentTab('report');
  const handleViewPatients = () => setCurrentTab('patients');

  const handleQuickDemoPatient = () => {
    if (patients.length > 0) {
      onSelectPatientToPlan(patients[0].id);
    } else {
      setCurrentTab('form');
    }
  };

  const featureCards = [
    {
      title: "Personalized Diet Plans",
      desc: "Autogenerates macro proportions and dynamic day splittings adjusted for calories, BMI, specific thyroid, and diabetic guidelines.",
      icon: HeartPulse,
      color: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      title: "Report-Based Suggestions",
      desc: "Reads blood glucose, lipid counts, and hemoglobin metrics from laboratory printouts to automatically suggest foods to prefer or limit.",
      icon: Sparkles,
      color: "text-sky-600 bg-sky-50 border-sky-101"
    },
    {
      title: "Region-Based Food Choices",
      desc: "Integrates local culinary guides (South India, North India, Kerala, Tamil Nadu, Hyderabad) so food lists remain realistic and achievable.",
      icon: MapPin,
      color: "text-amber-600 bg-amber-50 border-amber-101"
    },
    {
      title: "Editable & Printable Charts",
      desc: "Direct Excel-style spreadsheet editor online. Prints standard prescription sheets displaying doctor branding, notes, and seals.",
      icon: Printer,
      color: "text-rose-600 bg-rose-50 border-rose-101"
    },
    {
      title: "Physician-Safe Guidance",
      desc: "Strict clinical thresholds: locks dangerous caloric restrictions and triggers strong doctor checks for critical lab metrics.",
      icon: ShieldCheck,
      color: "text-indigo-650 bg-indigo-50 border-indigo-101"
    }
  ];

  return (
    <div className="space-y-8 select-text mb-6">
      
      {/* 2 Column Top Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        
        {/* Left Side: Welcomer */}
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xxs px-3 py-1 font-bold rounded-full bg-teal-50 border border-teal-200/50 text-teal-700 uppercase tracking-widest inline-block animate-pulse-subtle">
              Clinician Workspace Platform
            </span>
            <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
              Welcome to Dr. Afreen Fathima <br />
              <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-emerald-650 bg-clip-text text-transparent">Nutrition Assistant</span>
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed max-w-lg font-medium">
              An AI-powered clinical assistant designed to speed up patient metadata intake, parse hospital laboratory panels, locate regional food items, and compile clean editable diet charts.
            </p>
          </div>

          {/* Core Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleCreateNew}
              type="button"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 group transition-all cursor-pointer shadow-md shadow-teal-600/10"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Create Patient Chart</span>
            </button>

            <button
              onClick={handleUpload}
              type="button"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 group transition-all cursor-pointer shadow-sm"
            >
              <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform text-teal-400" />
              <span>Upload Patient Report</span>
            </button>

            <button
              onClick={handleViewPatients}
              type="button"
              className="bg-white border border-slate-205 hover:bg-slate-50 text-slate-700 font-bold text-xs p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 group transition-all cursor-pointer shadow-xs"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
              <span>View Saved Patients</span>
            </button>
          </div>
        </div>

        {/* Right Side: Assistant greeting card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-850 shadow-md flex flex-col justify-between relative overflow-hidden text-white">
          {/* Accent decoration */}
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-xxs font-bold tracking-widest text-teal-400 uppercase">AI Dialogue Assistant</span>
            </div>

            <div className="space-y-3 leading-relaxed">
              <p className="text-xs font-semibold text-teal-200">"Hello, I am Dr. Afreen Fathima's Assistant."</p>
              <p className="text-[11px] text-slate-400 font-normal leading-normal">
                I can help prepare personalized diet charts based on patient medical reports, therapeutic health goals, physical measurements, and regional food preferences.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
            <div className="text-[10px] text-slate-500">
              {patients.length} Patient records locally loaded
            </div>
            
            <button
              onClick={handleQuickDemoPatient}
              className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors bg-transparent border-none"
            >
              <span>Quick Start Sandbox</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grids */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Core Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {featureCards.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-start space-y-3 hover:shadow-md transition-shadow">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${f.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">{f.title}</h4>
                  <p className="text-slate-500 text-[10px] leading-normal font-medium">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
