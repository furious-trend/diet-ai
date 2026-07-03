import React from 'react';
import { 
  Home, 
  UserPlus, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Users, 
  Settings as SettingsIcon,
  Activity,
  HeartPulse
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, clinicSettings }) {
  const menuItems = [
    { id: 'home', label: 'Welcome Page', icon: Home },
    { id: 'form', label: 'Patient Form', icon: UserPlus },
    { id: 'report', label: 'Upload Report', icon: FileText },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'diet', label: 'Generate Diet Chart', icon: Calendar },
    { id: 'patients', label: 'Saved Patients', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 no-print">
      <div>
        {/* Brand/Doctor Title */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 text-teal-400">
            <HeartPulse className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide leading-tight">
              Dr. Afreen Fathima
            </h1>
            <p className="text-teal-400 text-xxs font-semibold tracking-wider uppercase mt-0.5">
              Nutrition Assistant
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 border border-teal-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Doctor Profile Context */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white uppercase shadow-inner border border-teal-400/25">
            {clinicSettings.doctorName ? clinicSettings.doctorName.charAt(0) : 'D'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {clinicSettings.doctorName || 'Dr. Afreen Fathima'}
            </p>
            <p className="text-[10px] text-teal-500 truncate">
              {clinicSettings.clinicName || 'Apollo Clinical Wellness'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
