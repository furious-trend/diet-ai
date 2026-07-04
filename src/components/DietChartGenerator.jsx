import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  RotateCw, 
  FileCheck, 
  Printer, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Droplet,
  Coffee,
  Sun,
  MoonStar,
  Apple,
  Utensils,
  Clock,
  Loader2
} from 'lucide-react';
import { generateSmartTimelinePlan } from '../services/aiService';

export default function DietChartGenerator({ patients, activePatientId, onSavePatientChart, onNotification }) {
  const [selectedPatientId, setSelectedPatientId] = useState(activePatientId || "");
  const [dayCount, setDayCount] = useState(1);
  const [activePlan, setActivePlan] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync selected patient when activePatientId prop changes
  useEffect(() => {
    if (activePatientId) {
      setSelectedPatientId(activePatientId);
    }
  }, [activePatientId]);

  // Load saved chart when selected patient changes
  useEffect(() => {
    if (selectedPatientId) {
      const pat = patients.find(p => p.id === selectedPatientId);
      if (pat && pat.dietChart) {
        setActivePlan(pat.dietChart);
      } else {
        setActivePlan(null);
      }
    }
  }, [selectedPatientId, patients]);

  const activePatientObj = patients.find(p => p.id === selectedPatientId);

  const triggerGeneration = async () => {
    if (!activePatientObj) {
      onNotification("Please select a patient before compiling a diet plan.", "warning");
      return;
    }
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      onNotification("Generating diet plan with AI...", "success");
      const compiled = await generateSmartTimelinePlan(activePatientObj, dayCount);
      setActivePlan(compiled);
      setSelectedDayIndex(0);
      onNotification(`Diet plan initialized for ${activePatientObj.name}!`, "success");
    } catch (err) {
      console.error(err);
      onNotification("Failed to generate plan. Please try again.", "warning");
    } finally {
      setIsGenerating(false);
    }
  };

  // Cell editing modifier
  const handleCellEdit = (dayIndex, mealIndex, fieldName, newVal) => {
    if (!activePlan) return;
    
    // Deep clone the active plan
    const updated = { ...activePlan };
    updated.days[dayIndex].meals[mealIndex][fieldName] = newVal;
    setActivePlan(updated);
  };

  const handleMetadataEdit = (fieldName, index, val) => {
    if (!activePlan) return;
    const updated = { ...activePlan };

    if (fieldName === 'lifestyle') {
      updated.lifestyle[index] = val;
    } else if (fieldName === 'lifestyle-add') {
      updated.lifestyle.push("");
    } else if (fieldName === 'lifestyle-delete') {
      updated.lifestyle.splice(index, 1);
    } else {
      updated[fieldName] = val;
    }
    setActivePlan(updated);
  };

  const addMealRow = () => {
    if (!activePlan) return;
    const updated = { ...activePlan };
    updated.days[selectedDayIndex].meals.push({
      time: "12:00 PM",
      meal: "Extra Meal",
      foodOptions: "Fresh greens and grains",
      portion: "1 serving",
      notes: "Custom instructions"
    });
    setActivePlan(updated);
  };

  const removeMealRow = (mealIdx) => {
    if (!activePlan) return;
    const updated = { ...activePlan };
    updated.days[selectedDayIndex].meals.splice(mealIdx, 1);
    setActivePlan(updated);
  };

  const handleSaveChart = () => {
    if (!activePlan) return;
    onSavePatientChart(selectedPatientId, activePlan);
    onNotification(`Saved diet chart successfully.`, "success");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Configuration Hub */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 no-print">
        <h2 className="text-lg font-bold text-slate-800">Diet Planner Workspace</h2>
        <p className="text-slate-500 text-xs mt-0.5">Customize nutrient thresholds, locate local farm items, and compile diet charts</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
          {/* Patient dropdown */}
          <div>
            <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700 cursor-pointer"
            >
              <option value="">-- Choose active patient profile --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Age: {p.age}, goal: {p.goal.replace("_", " ")})</option>
              ))}
            </select>
          </div>

          {/* Day span */}
          <div>
            <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Diet Timeline</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDayCount(num)}
                  className={`py-3 rounded-xl border text-xs font-semibold ${
                    dayCount === num
                      ? 'bg-teal-600 border-teal-500 text-white shadow-sm'
                      : 'bg-slate-55 border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {num} {num === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={triggerGeneration}
            disabled={isGenerating}
            type="button"
            className={`font-semibold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isGenerating
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg hover:shadow-teal-605/20'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Chart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center py-32 animate-pulse">
           <Loader2 className="w-12 h-12 text-teal-400 animate-spin mb-6" />
           <h3 className="font-bold text-lg text-slate-800 tracking-wide">AI is Drafting Clinical Meals...</h3>
           <p className="text-slate-400 text-sm mt-2 max-w-sm leading-relaxed">
             This takes 10-15 seconds. Compiling local ingredients, checking allergies, and applying the clinical targets for {activePatientObj?.name || 'the patient'}.
           </p>
        </div>
      ) : activePlan ? (
        <div className="space-y-6">
          {/* Main workspace editor */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden no-print">
            
            {/* Inner navigation header for multi-day plans */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">
                    Editing: {activePatientObj ? activePatientObj.name : "Plan"}
                  </h3>
                  <p className="text-slate-400 text-xxs mt-0.2 uppercase font-bold tracking-wider">
                    {activePlan.goal.replace("_", " ")} | BMI: {activePlan.bmi} ({activePlan.bmiCategory})
                  </p>
                </div>
              </div>

              {/* Day selection tabs */}
              {activePlan.days.length > 1 && (
                <div className="flex bg-slate-150 p-1 rounded-xl gap-1 border border-slate-200 shrink-0">
                  {activePlan.days.map((d, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedDayIndex(index)}
                      className={`text-xxs px-3 py-1.5 rounded-lg font-bold transition-all ${
                        selectedDayIndex === index
                          ? 'bg-white text-slate-800 shadow-xs'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Meal Cards Layout */}
            <div className="p-6 space-y-4 bg-slate-50/50">
              {activePlan.days[selectedDayIndex]?.meals.map((row, idx) => {
                let MealIcon = Utensils;
                let theme = "text-slate-600 bg-slate-100 border-slate-200";
                const name = row.meal?.toLowerCase() || '';
                
                if (name.includes('wake') || name.includes('morning')) {
                  MealIcon = Coffee;
                  theme = "text-amber-600 bg-amber-50 border-amber-200";
                } else if (name.includes('breakfast')) {
                  MealIcon = Sun;
                  theme = "text-orange-500 bg-orange-50 border-orange-200";
                } else if (name.includes('snack')) {
                  MealIcon = Apple;
                  theme = "text-emerald-600 bg-emerald-50 border-emerald-200";
                } else if (name.includes('lunch') || name.includes('meal')) {
                  MealIcon = Utensils;
                  theme = "text-teal-600 bg-teal-50 border-teal-200";
                } else if (name.includes('dinner') || name.includes('bed')) {
                  MealIcon = MoonStar;
                  theme = "text-indigo-600 bg-indigo-50 border-indigo-200";
                }

                return (
                  <div key={idx} className="group relative bg-white rounded-2xl border border-slate-150 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5 items-start">
                    
                    {/* Time & Meal Identity */}
                    <div className="flex flex-col gap-2 min-w-[140px] shrink-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${theme}`}>
                        <MealIcon className="w-5 h-5" />
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          value={row.time}
                          onChange={(e) => handleCellEdit(selectedDayIndex, idx, 'time', e.target.value)}
                          className="w-full text-base font-black text-slate-800 bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-teal-500 focus:outline-none transition-colors px-1 py-0.5 -ml-1 mt-1"
                          placeholder="08:00 AM"
                        />
                        <input
                          type="text"
                          value={row.meal}
                          onChange={(e) => handleCellEdit(selectedDayIndex, idx, 'meal', e.target.value)}
                          className="w-full text-xs font-bold text-slate-400 uppercase tracking-widest bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-teal-500 focus:outline-none transition-colors px-1 py-0.5 -ml-1 mt-1"
                          placeholder="MEAL NAME"
                        />
                      </div>
                    </div>

                    {/* Content Fields */}
                    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
                      
                      {/* Food Options & Clinical Notes */}
                      <div className="lg:col-span-8 flex flex-col gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1.5 ml-1">Menu Items</label>
                          <textarea
                            rows={3}
                            value={row.foodOptions}
                            onChange={(e) => handleCellEdit(selectedDayIndex, idx, 'foodOptions', e.target.value)}
                            className="w-full text-sm text-slate-700 font-medium leading-relaxed bg-slate-50/70 hover:bg-slate-50 border border-slate-100 focus:bg-white hover:border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                            placeholder="Food recommendations..."
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={row.notes}
                            onChange={(e) => handleCellEdit(selectedDayIndex, idx, 'notes', e.target.value)}
                            className="w-full text-xs italic font-medium text-slate-500 bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                            placeholder="Clinical instructions (e.g., 'Low sodium', 'Avoid oil')..."
                          />
                        </div>
                      </div>

                      {/* Portion Field */}
                      <div className="lg:col-span-4">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1.5 ml-1">Prescribed Portion</label>
                        <input
                          type="text"
                          value={row.portion}
                          onChange={(e) => handleCellEdit(selectedDayIndex, idx, 'portion', e.target.value)}
                          className="w-full text-sm font-bold text-slate-700 bg-slate-50 hover:bg-white border border-slate-150 hover:border-slate-250 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
                          placeholder="e.g., '1 bowl'"
                        />
                      </div>
                    </div>

                    {/* Delete Card Button (Visible on Hover) */}
                    <button
                      type="button"
                      onClick={() => removeMealRow(idx)}
                      className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete meal card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Row controller toolbar */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={addMealRow}
                type="button"
                className="text-teal-600 hover:text-teal-700 bg-white border border-teal-150 hover:bg-teal-50 px-3.5 py-2 rounded-xl text-xxs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Meal Row
              </button>
              
              <div className="text-[10px] text-slate-400 italic">
                * Cells are directly editable. Use tab keys to jump. Changes are synced instantly in active draft.
              </div>
            </div>
          </div>

          {/* Supplements / Guidelines editor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
            {/* Guidelines Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-101 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
                <Droplet className="w-4 h-4 text-teal-600" /> Hydration & Exclusions
              </h3>

              <div className="space-y-4">
                {/* Liters */}
                <div>
                  <label className="block text-xxs font-bold text-slate-450 uppercase mb-1">Hydration Target</label>
                  <input
                    type="text"
                    value={activePlan.hydrationTarget}
                    onChange={(e) => handleMetadataEdit('hydrationTarget', null, e.target.value)}
                    className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700 bg-slate-50"
                  />
                </div>

                {/* Exclude */}
                <div>
                  <label className="block text-xxs font-bold text-slate-450 uppercase mb-1">Definitive Exclusions (Foods to Avoid)</label>
                  <textarea
                    rows={2}
                    value={activePlan.foodsToAvoid}
                    onChange={(e) => handleMetadataEdit('foodsToAvoid', null, e.target.value)}
                    className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-650 leading-relaxed font-sans resize-none bg-slate-50"
                  />
                </div>

                {/* Prefer */}
                <div>
                  <label className="block text-xxs font-bold text-slate-450 uppercase mb-1">Primary Recommendations (Foods to Include)</label>
                  <textarea
                    rows={2}
                    value={activePlan.foodsToInclude}
                    onChange={(e) => handleMetadataEdit('foodsToInclude', null, e.target.value)}
                    className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-650 leading-relaxed font-sans resize-none bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle and Doctor Notes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-101 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4 flex-1">
                <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
                  <FileCheck className="w-4 h-4 text-teal-600" /> Lifestyle & Clinician Notes
                </h3>

                {/* Lifestyle items */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xxs font-bold text-slate-450 uppercase">Lifestyle Advice Guidelines</label>
                    <button 
                      type="button" 
                      onClick={() => handleMetadataEdit('lifestyle-add')}
                      className="text-teal-600 hover:text-teal-700 text-xxs font-bold flex items-center"
                    >
                      + Add Rule
                    </button>
                  </div>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {activePlan.lifestyle.map((l, lIdx) => (
                      <div key={lIdx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={l}
                          onChange={(e) => handleMetadataEdit('lifestyle', lIdx, e.target.value)}
                          className="flex-1 text-xs border border-slate-205 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-650 bg-slate-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleMetadataEdit('lifestyle-delete', lIdx)}
                          className="text-slate-300 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-2">
                  <label className="block text-xxs font-bold text-slate-450 uppercase mb-1">Doctor's Medical Notes</label>
                  <textarea
                    rows={3}
                    value={activePlan.doctorNotes}
                    onChange={(e) => handleMetadataEdit('doctorNotes', null, e.target.value)}
                    className="w-full text-xs border border-slate-205 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-650 leading-relaxed font-sans resize-none bg-slate-50"
                  />
                </div>
              </div>

              {/* Workspace CTA Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleSaveChart}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-3 rounded-xl shadow-xs transition-colors text-center cursor-pointer"
                >
                  Save Patient Record
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Diet Chart
                </button>
              </div>
            </div>
          </div>

          {/* Printable Layout Sheet (Always rendered, hidden on screen by Tailwind, shown by @media print) */}
          <div className="print-only hidden print:block print-container max-w-4xl mx-auto p-8 font-sans text-slate-800">
            {/* Print Header pad */}
            <div className="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-wide uppercase">Dr. Afreen Fathima</h1>
                <p className="text-teal-700 text-xxs font-bold tracking-widest uppercase">Clinical Nutritionist & Diet dietitian</p>
                <p className="text-slate-500 text-[10px] mt-1 leading-normal">
                  "Apollo Hospitals Wellness Center" <br />
                  Email: "fathima.nutrition@apollo.com" | Phone: "+91 9845X - XXXXX"
                </p>
              </div>
              <div className="text-right">
                <div className="border border-slate-200 p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Date generated</span>
                  <span className="text-xs font-bold text-slate-700">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Patient overview row */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Patient Name</span>
                <span className="font-bold text-slate-800 text-sm">{activePatientObj ? activePatientObj.name : "Patient"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Age / Gender</span>
                <span className="font-semibold text-slate-900">{activePatientObj?.age} Yrs / {activePatientObj?.gender}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">BMI Profile</span>
                <span className="font-semibold text-slate-900">{parseFloat(activePlan.bmi).toFixed(1)} ({activePlan.bmiCategory})</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Primary Goal</span>
                <span className="font-bold text-teal-750 uppercase text-[10px]">{activePlan.goal.replace("_", " ")}</span>
              </div>
            </div>

            {/* Timed plan layout for each day */}
            <div className="space-y-6">
              {activePlan.days.map((day, dIdx) => (
                <div key={dIdx} className={`${dIdx > 0 ? 'print-page-break pt-8' : ''}`}>
                  <h3 className="text-sm font-bold text-slate-900 bg-slate-100 p-2 rounded-lg px-4 border border-slate-200 mb-3 uppercase tracking-wider">{day.day} Meal Target</h3>
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 border-b border-slate-200 font-bold uppercase text-[9px] tracking-wider">
                        <th className="p-3 w-[12%] border-r border-slate-200">Time</th>
                        <th className="p-3 w-[15%] border-r border-slate-200">Meal</th>
                        <th className="p-3 w-[45%] border-r border-slate-200">Foods Recommended</th>
                        <th className="p-3 w-[13%] border-r border-slate-200">Portion</th>
                        <th className="p-3 w-[15%]">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {day.meals.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-700 border-r border-slate-200 whitespace-nowrap">{row.time}</td>
                          <td className="p-3 font-bold text-slate-900 border-r border-slate-200">{row.meal}</td>
                          <td className="p-3 text-slate-800 border-r border-slate-200 leading-relaxed whitespace-pre-line">{row.foodOptions}</td>
                          <td className="p-3 text-slate-700 border-r border-slate-200">{row.portion}</td>
                          <td className="p-3 text-slate-500 italic leading-relaxed">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Secondary Print Blocks */}
            <div className="grid grid-cols-2 gap-6 mt-8 border-t border-slate-200 pt-6 text-xs">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Foods to Strictly Avoid:</h4>
                  <p className="text-slate-600 leading-relaxed font-semibold italic">{activePlan.foodsToAvoid}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Foods to Prioritize:</h4>
                  <p className="text-slate-600 leading-relaxed">{activePlan.foodsToInclude}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Hydration Target:</h4>
                  <p className="text-teal-700 font-bold flex items-center gap-1">
                    <span>{activePlan.hydrationTarget}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Routine Health/Lifestyle Targets:</h4>
                  <ul className="list-disc list-inside text-slate-650 space-y-1 pl-1 leading-normal">
                    {activePlan.lifestyle.map((l, idx) => (
                      <li key={idx}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">Clinician Notes:</h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-55 p-3 rounded-lg border border-slate-250 italic">
                    {activePlan.doctorNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Prescription Footer signatures */}
            <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-200">
              <div className="text-[9px] text-slate-400 max-w-md leading-relaxed">
                <strong className="text-slate-800 font-bold block mb-1">Urgently Important Disclaimer:</strong>
                "This AI assistant provides general nutrition support and draft diet plans. Final medical and diet decisions should be reviewed and approved by Dr. Afreen Fathima or a qualified healthcare professional."
              </div>
              <div className="text-center w-48 border-t border-slate-300 pt-2 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">Physician Sign / Seal</span>
                <span className="text-xs font-bold text-slate-800 italic mt-1 block">Dr. Afreen Fathima</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center py-20">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 border border-slate-150 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 stroke-1.2" />
          </div>
          <h3 className="font-bold text-base text-slate-700 uppercase tracking-wider">Awaiting Generation Workspace</h3>
          <p className="text-slate-400 text-xs mt-1.5 max-w-sm leading-relaxed">
            Select a saved patient profile from the list above, select the day range (1, 3, or 7 days), and click "Generate Chart" to establish the spreadsheet editor sheet.
          </p>
        </div>
      )}
    </div>
  );
}
