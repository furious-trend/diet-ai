import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  Edit3, 
  Trash2, 
  FileText, 
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert,
  HeartPulse,
  Scale
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PatientDashboard({ patients, onDeletePatient, onEditPatientSelect, onSelectPatientToPlan, onNotification }) {
  const [searchVal, setSearchVal] = useState("");
  const [goalFilter, setGoalFilter] = useState("all");

  // Calculate quick clinical statistics
  const total = patients.length;
  const diabeticCount = patients.filter(p => 
    p.goal === 'diabetes_management' || 
    p.conditions.includes('Diabetes Typ-2') ||
    parseFloat(p.labValues?.hbA1c) >= 6.5
  ).length;

  const hypertensionCount = patients.filter(p => 
    p.conditions.includes('Hypertension') || 
    (p.labValues?.bloodPressure && parseInt(p.labValues.bloodPressure.split('/')[0]) > 139)
  ).length;

  const obeseCount = patients.filter(p => p.bmiCategory === 'Obese').length;

  // Filter patients list
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                          p.email.toLowerCase().includes(searchVal.toLowerCase()) || 
                          p.phone.includes(searchVal);
    const matchesGoal = goalFilter === "all" || p.goal === goalFilter;
    return matchesSearch && matchesGoal;
  });

  // Simple Chart Data for BMI Category count
  const getBmiDistribution = () => {
    const counts = { Underweight: 0, Normal: 0, Overweight: 0, Obese: 0 };
    patients.forEach(p => {
      if (p.bmiCategory && counts[p.bmiCategory] !== undefined) {
        counts[p.bmiCategory]++;
      }
    });

    return [
      { name: 'Underweight', count: counts.Underweight, color: '#38bdf8' },
      { name: 'Normal Range', count: counts.Normal, color: '#34d399' },
      { name: 'Overweight', count: counts.Overweight, color: '#f59e0b' },
      { name: 'Clinically Obese', count: counts.Obese, color: '#f87171' }
    ];
  };

  const chartData = getBmiDistribution();

  const handleEdit = (p) => {
    onEditPatientSelect(p);
  };

  const handlePlan = (p) => {
    onSelectPatientToPlan(p.id);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete patient ${name}?`)) {
      onDeletePatient(id);
      onNotification(`Patient records for ${name} removed.`, "info");
    }
  };

  return (
    <div className="space-y-6 select-text mb-6">
      
      {/* Clinician Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        {/* Total Patients */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block">Total Registered</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block leading-none">{total}</span>
          </div>
        </div>

        {/* Sugar Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block font-sans">Glycemic Cases</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block leading-none">{diabeticCount}</span>
          </div>
        </div>

        {/* Cardiac Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block font-sans">High BP Cases</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block leading-none">{hypertensionCount}</span>
          </div>
        </div>

        {/* Obese cases */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block font-sans">Obese Profiles</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block leading-none">{obeseCount}</span>
          </div>
        </div>
      </div>

      {/* Grid: Search & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Cols: Search, Filters & Cards */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between no-print">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search patient, contact, email..."
                className="w-full text-xs border border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
              />
            </div>

            <div className="flex w-full md:w-auto items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full md:w-56 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-600 cursor-pointer"
              >
                <option value="all">All Therapeutic Goals</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="weight_gain">Weight Gain</option>
                <option value="diabetes_management">Diabetes Management</option>
                <option value="pcos_support">PCOS Support</option>
                <option value="thyroid_support">Thyroid Support</option>
                <option value="heart_health">Heart Health</option>
                <option value="kidney_friendly_diet">Kidney Friendly</option>
                <option value="pregnancy_nutrition">Pregnancy Nutrition</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="general_wellness">General Wellness</option>
              </select>
            </div>
          </div>

          {/* Cards List */}
          {filteredPatients.length > 0 ? (
            <div className="space-y-4">
              {filteredPatients.map((p) => {
                const hasSugar = p.conditions.includes('Diabetes Typ-2') || p.labValues?.hbA1c >= 6.5;
                const hasThyr = p.conditions.includes('Hypothyroid') || p.labValues?.thyroidTsh > 4.5;
                
                return (
                  <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div>
                        {/* Name Block */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-800 text-sm">{p.name}</h4>
                          <span className="text-[10px] text-slate-450 font-bold bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                            {p.age} Yrs / {p.gender}
                          </span>
                        </div>
                        {/* Location */}
                        <p className="text-[10px] text-slate-450 font-medium mt-1 uppercase tracking-wide">
                          Region: {p.region.replace("_", " ")} | Diet: {p.foodPreference}
                        </p>
                      </div>

                      {/* Goal Badge */}
                      <div className="shrink-0 flex items-center gap-2">
                        {p.dietChart && (
                          <span className="text-xxs px-2 py-0.5 font-bold rounded border bg-indigo-50 text-indigo-700 border-indigo-100 uppercase tracking-wide flex items-center gap-1">
                             <FileText className="w-3 h-3" /> Chart Saved
                          </span>
                        )}
                        <span className="text-xxs px-3 py-1 font-bold rounded-full bg-teal-50 border border-teal-200/50 text-teal-700 uppercase tracking-wide">
                          {p.goal.replace("_", " ")}
                        </span>
                        
                        {p.bmiCategory && (
                          <span className={`text-[10px] px-2 py-0.5 font-bold rounded border ${
                            p.bmiCategory === 'Normal' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            p.bmiCategory === 'Obese' ? 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            BMI: {p.bmi} ({p.bmiCategory})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Vitals overview preview */}
                    <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-3 mt-4 text-[10px] grid grid-cols-2 md:grid-cols-4 gap-2 leading-relaxed">
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider mb-0.5">Contact</span>
                        <span className="text-slate-700 font-semibold">{p.phone || "No phone"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider mb-0.5">Lab Markers</span>
                        <span className="text-slate-700 font-medium block">
                          HbA1c: {p.labValues?.hbA1c ? `${p.labValues.hbA1c}%` : "NA"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider mb-0.5">Thyroid</span>
                        <span className="text-slate-700 font-medium block">
                          TSH: {p.labValues?.thyroidTsh ? `${p.labValues.thyroidTsh} uIU` : "NA"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px] tracking-wider mb-0.5 font-semibold">Conditions</span>
                        <span className="text-slate-600 truncate block">
                          {p.conditions.length > 0 ? p.conditions.join(", ") : "None"}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100/70 no-print">
                      <span className="text-[9px] text-slate-400 italic">
                        Registered: {new Date(p.createdAt || Date.now()).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(p)}
                          className="bg-white border border-slate-205 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-lg text-xxs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlan(p)}
                          className="bg-teal-650 hover:bg-teal-700 text-white px-3.5 py-1.5 rounded-lg text-xxs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                        >
                          <Calendar className="w-3 h-3" /> {p.dietChart ? "View / Edit Plan" : "Create Diet Plan"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="text-slate-350 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Patient"
                        >
                          <Trash2 className="w-3.5 h-3.5 bg-transparent border-none" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center py-24 select-none">
              <Users className="w-12 h-12 text-slate-300 stroke-1.2 mb-3" />
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide">No patient files found</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-xs leading-relaxed">
                We couldn't locate registered patient documents. Open 'Patient Form' or clear active filters to start.
              </p>
            </div>
          )}
        </div>

        {/* Right Col: charts stats */}
        <div className="space-y-6 no-print">
          
          {/* Distribution card widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-655" /> BMI Distributions
              </h3>
              <p className="text-slate-500 text-xxs mt-0.5">Clinical audit index showing patient weight categories</p>
            </div>

            {total > 0 ? (
              <div className="space-y-5">
                {/* Recharts chart */}
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} precision={0} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend detail status */}
                <div className="space-y-2 text-[10px] text-slate-600 font-medium">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100/50">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span>{d.name}</span>
                      </div>
                      <span className="font-bold text-slate-750">{d.count} ({total > 0 ? Math.round((d.count / total) * 100) : 0}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 border border-dashed border-slate-200 rounded-xl">
                 <Scale className="w-6 h-6 text-slate-350 stroke-1.3 mb-2" />
                 <p className="text-xxs text-slate-400">Charts require active patient logs. Add patient to view metrics.</p>
              </div>
            )}
          </div>

          {/* Practice Disclaimer Banner card */}
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
            {/* Background accent decor circle */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-teal-500/10 rounded-full blur-xl" />
            
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
              <HeartPulse className="w-4 h-4 text-teal-400" /> Clinic Guide Disclaimer
            </h4>
            <p className="text-[10px] leading-relaxed text-slate-400 mt-2">
              "This AI assistant provides general nutrition support and draft diet plans. Final medical and diet decisions should be reviewed and approved by Dr. Afreen Fathima or a qualified healthcare professional."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
