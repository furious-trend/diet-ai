import React, { useState, useEffect } from 'react';
import { User, Activity, Flame, Heart, FileSpreadsheet, PlusCircle, CheckCircle2 } from 'lucide-react';
import BMICalculator from './BMICalculator';

const CLINICAL_GOALS = [
  { value: "weight_loss", label: "Weight Loss Management" },
  { value: "weight_gain", label: "Healthy Weight Gain" },
  { value: "diabetes_management", label: "Diabetes Mellitus Control" },
  { value: "pcos_support", label: "PCOS / Hormonal Balancing" },
  { value: "thyroid_support", label: "Hypothyroid / Metabolism Care" },
  { value: "heart_health", label: "Cardiac / lipid Management" },
  { value: "kidney_friendly_diet", label: "Renal-Safe nutritional plans" },
  { value: "pregnancy_nutrition", label: "Maternal & Pregnancy Nutrition" },
  { value: "muscle_gain", label: "Athletic Hypertrophy / Muscle Gain" },
  { value: "general_wellness", label: "General Geriatric / Pro-wellness Care" }
];

export default function PatientIntakeForm({ onAddPatient, initialPatient = null, onNotification }) {
  const [formData, setFormData] = useState({
    name: "", age: "", gender: "Male", phone: "", email: "",
    region: "south_india", preferredLanguage: "English",
    height: "", weight: "", waist: "",
    activityLevel: "sedentary", occupation: "", sleepSchedule: "7-8 Hours", waterIntake: "2 Liters",
    foodPreference: "vegetarian", likes: "", dislikes: "", allergies: "",
    conditions: [], medications: "",
    goal: "general_wellness", mealTimingPreference: "Flexible", budgetLevel: "medium", cookingDifficulty: "easy",
    labValues: {
      bloodSugarFasting: "", hbA1c: "", cholesterol: "", triglycerides: "",
      thyroidTsh: "", hemoglobin: "", vitaminD: "", vitaminB12: "", bloodPressure: ""
    },
    reportText: ""
  });

  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (initialPatient) {
      setFormData(initialPatient);
      if (initialPatient.bmi) {
        setBmi(initialPatient.bmi);
        setBmiCategory(initialPatient.bmiCategory);
      }
    }
  }, [initialPatient]);

  // Recalculate BMI on Height/Weight changes
  useEffect(() => {
    const w = parseFloat(formData.weight);
    const h = parseFloat(formData.height);

    if (w > 0 && h > 0) {
      const hMeters = h / 100;
      const calculatedBmi = w / (hMeters * hMeters);
      setBmi(calculatedBmi);

      // BMI Classifications
      if (calculatedBmi < 18.5) {
        setBmiCategory("Underweight");
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
        setBmiCategory("Normal");
      } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obese");
      }
    } else {
      setBmi(0);
      setBmiCategory("");
    }
  }, [formData.height, formData.weight]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLabChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      labValues: {
        ...prev.labValues,
        [name]: value
      }
    }));
  };

  const handleConditionToggle = (cond) => {
    setFormData(prev => {
      const current = [...prev.conditions];
      const idx = current.indexOf(cond);
      if (idx > -1) {
        current.splice(idx, 1);
      } else {
        current.push(cond);
      }
      return { ...prev, conditions: current };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      onNotification("Patient Full Name is mandatory.", "warning");
      return;
    }
    if (!formData.age || parseInt(formData.age) <= 0) {
      onNotification("Please specify a logical Patient Age.", "warning");
      return;
    }

    const payload = {
      ...formData,
      bmi: bmi > 0 ? parseFloat(bmi.toFixed(1)) : 0,
      bmiCategory,
      updatedAt: new Date().toISOString()
    };

    onAddPatient(payload);
    onNotification(initialPatient ? "Patient file modified." : "New patient intake files created.", "success");
    
    // Clear Form unless updating
    if (!initialPatient) {
      setFormData({
        name: "", age: "", gender: "Male", phone: "", email: "",
        region: "south_india", preferredLanguage: "English",
        height: "", weight: "", waist: "",
        activityLevel: "sedentary", occupation: "", sleepSchedule: "7-8 Hours", waterIntake: "2 Liters",
        foodPreference: "vegetarian", likes: "", dislikes: "", allergies: "",
        conditions: [], medications: "",
        goal: "general_wellness", mealTimingPreference: "Flexible", budgetLevel: "medium", cookingDifficulty: "easy",
        labValues: {
          bloodSugarFasting: "", hbA1c: "", cholesterol: "", triglycerides: "",
          thyroidTsh: "", hemoglobin: "", vitaminD: "", vitaminB12: "", bloodPressure: ""
        },
        reportText: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-text mb-6">
      {/* 2 Column Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Fields Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Bio-Data metadata */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
              <User className="w-4 h-4 text-teal-600" /> Patient Demographics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="E.g., Ramesh Kumar"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="52"
                    className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-650 cursor-pointer"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ramesh@gmail.com"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Cultural Food Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-655 cursor-pointer"
                >
                  <option value="south_india">South India (Karnataka, AP, etc.)</option>
                  <option value="north_india">North India (Delhi, Punjab, etc.)</option>
                  <option value="hyderabad">Hyderabad / Telangana</option>
                  <option value="kerala">Kerala</option>
                  <option value="tamil_nadu">Tamil Nadu</option>
                  <option value="global">Global / Western Staples</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Preferred Language</label>
                <input
                  type="text"
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  placeholder="Hindi, Telugu, English"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Physical Vitals */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
              <Activity className="w-4 h-4 text-teal-600" /> Physical & Anthropometry Metrics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="172"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="85"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Waist Circumference (in)</label>
                <input
                  type="number"
                  name="waist"
                  value={formData.waist}
                  onChange={handleInputChange}
                  placeholder="38"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Daily Activity Level</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-655 cursor-pointer"
                >
                  <option value="sedentary">Sedentary (Desk Job)</option>
                  <option value="lightly active">Lightly Active (1-3 days walk)</option>
                  <option value="moderately active">Moderately Active (3-5 days workout)</option>
                  <option value="very active">Very Active (Heavy manual/sports)</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Software Developer"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Sleep Pattern</label>
                <input
                  type="text"
                  name="sleepSchedule"
                  value={formData.sleepSchedule}
                  onChange={handleInputChange}
                  placeholder="Late night, 6 hrs"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Water Intake (Daily)</label>
                <input
                  type="text"
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleInputChange}
                  placeholder="3 Liters"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Diet Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
              <Flame className="w-4 h-4 text-teal-600" /> Dietary Culture & Exclusions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Diet Type Group</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-655 cursor-pointer"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="eggitarian">Eggitarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="jain">Jain Diet</option>
                  <option value="halal">Halal Preference</option>
                </select>
              </div>

              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Allergies (comma separation)</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Peanuts, soy, gluten"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium hover:border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Likes / Habits</label>
                <input
                  type="text"
                  name="likes"
                  value={formData.likes}
                  onChange={handleInputChange}
                  placeholder="Walnuts, millets, coffee"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium hover:border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide mb-1">Dislikes / Rejections</label>
                <input
                  type="text"
                  name="dislikes"
                  value={formData.dislikes}
                  onChange={handleInputChange}
                  placeholder="Cabbage, mushrooms"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium hover:border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Active Medication Logs</label>
                <input
                  type="text"
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="Metformin 500mg, Thyronorm"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Meal Timings Rule</label>
                <input
                  type="text"
                  name="mealTimingPreference"
                  value={formData.mealTimingPreference}
                  onChange={handleInputChange}
                  placeholder="Early dinner prefix"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Budget Tier</label>
                <select
                  name="budgetLevel"
                  value={formData.budgetLevel}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-655"
                >
                  <option value="low">Standard / Economy</option>
                  <option value="medium">Balanced / Moderate</option>
                  <option value="premium">Premium / Organic imports</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Cooking Proficiency</label>
                <select
                  name="cookingDifficulty"
                  value={formData.cookingDifficulty}
                  onChange={handleInputChange}
                  className="w-full text-xs border border-slate-200 rounded-xl px-2 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-655"
                >
                  <option value="easy">Beginner / Easy meals</option>
                  <option value="moderate">Moderate / Daily basics</option>
                  <option value="advanced">Advanced / Multi-prep chef</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 4: Laboratory Panels */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
              <FileSpreadsheet className="w-4 h-4 text-teal-600" /> Laboratory Blood Panel (Optional Vitals)
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Fasting Glucose (mg/dL)</label>
                <input
                  type="number"
                  name="bloodSugarFasting"
                  value={formData.labValues.bloodSugarFasting}
                  onChange={handleLabChange}
                  placeholder="126"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">HbA1c (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="hbA1c"
                  value={formData.labValues.hbA1c}
                  onChange={handleLabChange}
                  placeholder="7.2"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Cholesterol Total (mg/dL)</label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.labValues.cholesterol}
                  onChange={handleLabChange}
                  placeholder="240"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Triglycerides (TG)</label>
                <input
                  type="number"
                  name="triglycerides"
                  value={formData.labValues.triglycerides}
                  onChange={handleLabChange}
                  placeholder="185"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">TSH Thyroid (uIU/mL)</label>
                <input
                  type="number"
                  step="0.01"
                  name="thyroidTsh"
                  value={formData.labValues.thyroidTsh}
                  onChange={handleLabChange}
                  placeholder="5.4"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Hemoglobin (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="hemoglobin"
                  value={formData.labValues.hemoglobin}
                  onChange={handleLabChange}
                  placeholder="11.2"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Vit D3 (ng/mL)</label>
                <input
                  type="number"
                  name="vitaminD"
                  value={formData.labValues.vitaminD}
                  onChange={handleLabChange}
                  placeholder="24"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Vit B12 (pg/mL)</label>
                <input
                  type="number"
                  name="vitaminB12"
                  value={formData.labValues.vitaminB12}
                  onChange={handleLabChange}
                  placeholder="220"
                  className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
                />
              </div>
            </div>
            
            <div className="w-1/2">
              <label className="block text-[10px] font-bold text-slate-455 uppercase mb-1">Blood Pressure (BP mmHg)</label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.labValues.bloodPressure}
                onChange={handleLabChange}
                placeholder="E.g., 140/90"
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Goal + BMI View Panel */}
        <div className="space-y-6">
          {/* Diagnostic Goal Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 pb-2 border-b border-slate-50">
              <Heart className="w-4 h-4 text-teal-600" /> Therapy Target Goal *
            </h3>

            <div className="space-y-3">
              <select
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full text-xs border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-500 font-bold text-teal-800 bg-slate-50 cursor-pointer"
              >
                {CLINICAL_GOALS.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>

              {/* Conditions checkboxes checkboxes */}
              <div className="pt-2 space-y-2">
                <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wide">Select Co-morbidities / Conditions</label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-150 p-3 rounded-xl bg-slate-50/50">
                  {["Hypertension", "Diabetes Typ-2", "Hypothyroid", "Hyperlipidemia", "PCOS / Anovulation", "Iron Deficiency Anemia", "Chronic Kidney Stage 1/2", "Fatty Liver", "Gerd / Acidity"].map((cond, idx) => {
                    const isChecked = formData.conditions.includes(cond);
                    return (
                      <label key={idx} className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer py-0.5 select-none font-medium">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleConditionToggle(cond)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
                        />
                        <span>{cond}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* BMI Live Widget */}
          <BMICalculator height={formData.height} weight={formData.weight} bmi={bmi} bmiCategory={bmiCategory} />

          {/* Submit Trigger */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-600/15 transition-all cursor-pointer hover:-translate-y-0.5 duration-200"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{initialPatient ? "Modify Patient Profile" : "Register Patient details"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
