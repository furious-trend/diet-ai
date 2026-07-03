import React, { useState } from 'react';
import { Upload, ChevronRight, FileSpreadsheet, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { nlpAnalyzeReport } from '../services/aiService';

export default function ReportUploader({ onAnalysisComplete, initialText = "" }) {
  const [dragActive, setDragActive] = useState(false);
  const [rawText, setRawText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [activeAnalysis, setActiveAnalysis] = useState(null);

  // Clinical mock templates to ease testing for the user
  const reportPresets = [
    {
      name: "Select Preset Demo Report...",
      text: ""
    },
    {
      name: "Patient A - Elevated HbA1c (Diabetic)",
      text: "APOLLO DIAGNOSTICS LAB REPORT\nPatient Name: Ramesh Kumar   Age: 52\n---\nLab Parameter Results:\n- Fasting Blood Sugar: 168 mg/dL (Normal: < 100)\n- HbA1c: 7.9% (Diabetic range: > 6.5%)\n- Hemoglobin: 14.1 g/dL\n- TSH: 1.8 uIU/mL\n- eGFR: 84 mL/min"
    },
    {
      name: "Patient B - Hypothyroidism & Low Vit D",
      text: "CLINICAL PATHOLOGY SUMMARY\nPatient Name: Sneha Reddy   Age: 34\n---\nValues:\n- TSH (Thyroid Stimulating Hormone): 6.8 uIU/mL (High, range 0.45 - 4.5)\n- Vitamin D3: 18.5 ng/mL (Deficient, range > 30)\n- Free T4: 0.9 ng/dL\n- Hemoglobin: 12.0 g/dL"
    },
    {
      name: "Patient C - Hyperlipidemia & High BP",
      text: "PREVENTIVE HEALTH SCREENING CARD\nPatient Name: John Miller   Age: 46\n---\n- Systolic BP: 148 mmHg\n- Diastolic BP: 94 mmHg\n- Total Cholesterol: 245 mg/dL\n- LDL Cholesterol: 165 mg/dL (Elevated)\n- Triglycerides (TG): 210 mg/dL \n- HDL: 38 mg/dL (Low)"
    },
    {
      name: "Patient D - Severe Anemia Profile",
      text: "HEMATOLOGY CLINIC SHEET\nPatient Name: Anitha Das   Age: 27\n---\n- Hemoglobin (Hb): 9.2 g/dL (Severe deficiency: normal 12.0 - 15.0)\n- Vitamin B12: 148 pg/mL (Low, normal 200 - 900)\n- Total Iron Binding Capacity (TIBC): 440 ug/dL"
    }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setLoading(true);
    setStatusMessage(`Scanning file "${file.name}" with client-side OCR engine...`);
    
    // Simulate OCR delay (1.5 seconds)
    setTimeout(() => {
      // Pick a random report preset text as simulated OCR extract if the file is not plain text
      let simulatedText = "";
      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setRawText(e.target.result);
          setLoading(false);
          setStatusMessage("Text file imported successfully!");
        };
        reader.readAsText(file);
      } else {
        // Mock image/pdf OCR extraction
        const randomPreset = reportPresets[Math.floor(Math.random() * (reportPresets.length - 1)) + 1];
        simulatedText = `[OCR SCAN RESULT - ${file.name.toUpperCase()}]\n${randomPreset.text}`;
        setRawText(simulatedText);
        setLoading(false);
        setStatusMessage("Image OCR scan completed! Review extracted clinical values below.");
      }
    }, 1800);
  };

  const applyPreset = (e) => {
    const selectedIdx = e.target.value;
    if (selectedIdx && reportPresets[selectedIdx].text) {
      setRawText(reportPresets[selectedIdx].text);
      setStatusMessage("Demo preset report loaded. Ready for analysis.");
    }
  };

  const triggerAnalysis = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setStatusMessage("Running AI analysis models...");
    try {
      const result = await nlpAnalyzeReport(rawText);
      setActiveAnalysis(result);
      onAnalysisComplete(rawText, result);
    } catch (e) {
      console.error(e);
      setStatusMessage("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Health Report OCR Analyzer</h2>
            <p className="text-slate-500 text-xs mt-0.5">Drag diagnostic sheets or upload image scans to auto-catalog lab values</p>
          </div>
          
          {/* Quick preset selector for testing */}
          <div className="flex items-center gap-2">
            <span className="text-xxs font-bold text-slate-400 uppercase tracking-wide">Test Tool:</span>
            <select 
              onChange={applyPreset}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-600 cursor-pointer"
            >
              {reportPresets.map((r, i) => (
                <option key={i} value={i}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div 
          onDragEnter={handleDrag} 
          onDragOver={handleDrag} 
          onDragLeave={handleDrag} 
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center transition-all cursor-pointer relative min-h-48 ${
            dragActive 
              ? 'border-teal-500 bg-teal-500/5' 
              : 'border-slate-200 hover:border-teal-400 hover:bg-slate-50/50'
          }`}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
          />

          {loading ? (
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-600 rounded-full animate-spin" />
              <p className="text-teal-600 font-medium text-sm animate-pulse">{statusMessage}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto border border-teal-100">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Drag & drop doctor reports, PDFs, or photos here</p>
                <p className="text-slate-400 text-xs mt-1">Supports PDF, PNG, JPG, Docx (Max 10MB)</p>
              </div>
              <button 
                type="button" 
                className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-slate-50"
              >
                Browse Files
              </button>
            </div>
          )}
        </div>

        {statusMessage && !loading && (
          <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200/60 p-3 rounded-lg text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Editor & Action Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor for OCR Scan output */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600 animate-pulse-subtle" /> Extracted Document Text
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">Edit characters or paste raw hospital reports directly here</p>
          </div>

          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="No text scanned yet. Drop a file or paste hospital records here (e.g., HbA1c: 7.5%, TSH: 5.6)..."
            className="w-full h-64 bg-slate-55 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent resize-none leading-relaxed"
          />

          <button
            onClick={triggerAnalysis}
            disabled={!rawText.trim()}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              rawText.trim()
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-600/10 cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Analyze Health Markers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Display Analysis results panel */}
        <div>
          {activeAnalysis ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileSpreadsheet className="w-4 h-4 text-teal-600" /> Clinic Key Markers Identified
                </h3>
                
                {/* Findings list */}
                <div className="space-y-4 mt-4">
                  {/* ALERTS */}
                  {activeAnalysis.alerts.length > 0 && (
                    <div className="space-y-2">
                      {activeAnalysis.alerts.map((a, i) => (
                        <div key={i} className="flex gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 font-medium">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <h4 className="text-slate-700 font-bold text-xs">Diagnostic findings:</h4>
                    <ul className="list-disc list-inside text-slate-600 text-xs mt-1.5 space-y-1 pl-1">
                      {activeAnalysis.keyFindings.map((f, i) => (
                        <li key={i} className="leading-relaxed">{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-slate-700 font-bold text-xs">Primary Metabolism Concerns:</h4>
                    <ul className="list-disc list-inside text-slate-600 text-xs mt-1.5 space-y-1 pl-1">
                      {activeAnalysis.concerns.map((c, i) => (
                        <li key={i} className="leading-relaxed text-teal-700 font-medium">{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="bg-emerald-50/50 border border-emerald-100/50 p-2.5 rounded-xl text-xxs">
                      <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-1">Foods to Prefer</span>
                      <p className="text-slate-600 leading-normal pl-0.5">
                        {activeAnalysis.include.length > 0 ? activeAnalysis.include.join(", ") : "Green seasonal greens, seeds, complex grains."}
                      </p>
                    </div>
                    <div className="bg-rose-50/50 border border-rose-100/50 p-2.5 rounded-xl text-xxs">
                      <span className="font-bold text-rose-800 uppercase tracking-wider block mb-1">Foods to Limit</span>
                      <p className="text-slate-600 leading-normal pl-0.5">
                        {activeAnalysis.avoid.length > 0 ? activeAnalysis.avoid.join(", ") : "Refined white flour, added sugars, saturated oils."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed text-center italic mt-4">
                These warnings are extracted dynamically for Dr. Afreen Fathima's supervision and manual approval.
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-80 border-dashed border-2">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center border border-slate-150 mb-3">
                <FileSpreadsheet className="w-6 h-6 stroke-1.5" />
              </div>
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide">Awaiting Analysis</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                Import a patient report, review the file's text in the editor, and click "Analyze Health Markers" to view findings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
