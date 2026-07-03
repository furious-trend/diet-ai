import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-y border-amber-200/60 py-3.5 px-6 flex items-start gap-3.5 no-print select-text animate-pulse-subtle">
      <div className="bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20 text-amber-600 shrink-0 mt-0.5">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div className="text-xxs leading-relaxed text-amber-800 font-medium font-sans">
        <strong className="font-extrabold uppercase tracking-wide block mb-0.5 text-amber-900">Urgently Important Medical Disclaimer Notice</strong>
        "This AI assistant provides general nutrition support and draft diet plans. Final medical and diet decisions should be reviewed and approved by Dr. Afreen Fathima or a qualified healthcare professional."
      </div>
    </div>
  );
}
