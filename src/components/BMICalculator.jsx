import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function BMICalculator({ height, weight, bmi, bmiCategory }) {
  // Color presets based on Category
  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Underweight':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200',
          indicator: 'bg-sky-500',
          textColor: 'text-sky-600',
          pct: '10%'
        };
      case 'Normal':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          indicator: 'bg-emerald-500',
          textColor: 'text-emerald-600',
          pct: '40%'
        };
      case 'Overweight':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          indicator: 'bg-amber-500',
          textColor: 'text-amber-600',
          pct: '70%'
        };
      case 'Obese':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          indicator: 'bg-rose-500',
          textColor: 'text-rose-600',
          pct: '92%'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          indicator: 'bg-slate-400',
          textColor: 'text-slate-500',
          pct: '0%'
        };
    }
  };

  const theme = getCategoryTheme(bmiCategory);

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-6 rounded-2xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 text-sm tracking-wide flex items-center gap-2 uppercase">
          <ActivityIcon /> BMI Analysis
        </h3>
        {bmiCategory && (
          <span className={`text-xxs px-2.5 py-1 rounded-full font-bold border uppercase tracking-wider ${theme.bg}`}>
            {bmiCategory}
          </span>
        )}
      </div>

      {bmi > 0 ? (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-slate-800">
              {parseFloat(bmi).toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-400">kg/m²</span>
          </div>

          {/* Metric Bar Visual Slider */}
          <div className="relative pt-4">
            <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
              <div className="h-full w-[18.5%] bg-sky-400" title="Underweight" />
              <div className="h-full w-[25%] bg-emerald-400" title="Normal" />
              <div className="h-full w-[25%] bg-amber-400" title="Overweight" />
              <div className="h-full w-[31.5%] bg-rose-400" title="Obese" />
            </div>
            
            {/* Positioned Indicator Pointer */}
            <div 
              className={`absolute top-2 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 -ml-2 -mt-0.5 ${theme.indicator}`}
              style={{ left: theme.pct }}
            />
          </div>

          <div className="grid grid-cols-4 text-[9px] font-bold text-slate-400 tracking-wider uppercase text-center mt-1">
            <span>&lt; 18.5</span>
            <span>18.5 - 25</span>
            <span>25 - 30</span>
            <span>30+</span>
          </div>

          {/* Category-specific diagnostic alert bubble */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 mt-3 text-xs leading-relaxed ${theme.bg}`}>
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              {bmiCategory === 'Underweight' && (
                <p>The patient's body mass index is below the standard recommendation. Focus on protein density, healthy seed fats, complex calories, and muscle gain recommendations.</p>
              )}
              {bmiCategory === 'Normal' && (
                <p className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>The patient is in the healthy BMI zone. Focus on preserving mass, glycemic balancing, and general micronutrient wellness.</span>
                </p>
              )}
              {bmiCategory === 'Overweight' && (
                <p>The patient has a moderately higher body mass index. Support with mild calorie deficit, physical targets, saturated fat deletion, and fiber enhancement.</p>
              )}
              {bmiCategory === 'Obese' && (
                <p className="font-medium">The patient's index suggests cardiac and endocrine burden. Initiate carbohydrate restriction, lipid auditing, insulin monitoring, and regular physician followups.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400 gap-2 border border-dashed border-slate-200 rounded-xl">
          <Info className="w-6 h-6 stroke-1.5" />
          <p className="text-xs">Provide height and weight in the form details to calculate and display the clinical BMI dashboard status.</p>
        </div>
      )}
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
