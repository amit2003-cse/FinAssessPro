import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Result() {
  const { formData, resetForm } = useFormStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const submit = async () => {
      try {
        const res = await submitLead(formData);
        // API response example: { biScore: 42, riskBand: "High Risk" }
        setResult(res.data);
      } catch (err) {
        setError("Could not calculate score. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    submit();
  }, [formData]);

  // Loading Animation
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-emerald-200 rounded-full animate-pulse"></div>
        </div>
        <h2 className="mt-6 text-lg font-semibold text-slate-700">Analyzing Financial Profile...</h2>
        <p className="text-slate-400 text-sm mt-1">Calculating assets vs liabilities ratio</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Analysis Failed</h2>
        <p className="text-slate-500 mt-2 mb-6">{error}</p>
        <button onClick={resetForm} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors">
          Retry
        </button>
      </div>
    );
  }

  const { biScore, riskBand } = result;

  // --- Dynamic Styling Logic based on Score ---
  let colorTheme = "red"; // Default (Low Score)
  let statusIcon = (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  );
  let adviceText = "Critical attention needed. Reduce liabilities immediately.";

  if (biScore >= 75) {
    colorTheme = "emerald";
    statusIcon = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    adviceText = "Excellent profile! You are eligible for the best offers.";
  } else if (biScore >= 50) {
    colorTheme = "amber";
    statusIcon = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    adviceText = "Good profile, but reducing some debt could help.";
  }

  // Map colors for Tailwind (Dynamic classes need full names to work safely, simplified here)
  const colors = {
    red: { text: "text-red-600", bg: "bg-red-50", border: "border-red-100", ring: "stroke-red-500", btn: "bg-red-600 hover:bg-red-700" },
    amber: { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", ring: "stroke-amber-500", btn: "bg-amber-600 hover:bg-amber-700" },
    emerald: { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", ring: "stroke-emerald-500", btn: "bg-emerald-600 hover:bg-emerald-700" },
  };
  const theme = colors[colorTheme];

  // Gauge Calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (biScore / 100) * circumference;

  return (
    <div className="animate-in fade-in zoom-in duration-500 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      
      {/* 1. Top Section: Score Gauge */}
      <div className="pt-10 pb-8 px-6 text-center relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 ${theme.bg} rounded-full blur-3xl opacity-50 -z-10`}></div>

        <h2 className="text-2xl font-bold text-slate-800 mb-2">BI Score Result</h2>
        <p className="text-slate-500 text-sm mb-6">Generated via AI Analysis</p>

        {/* Circular Gauge */}
        <div className="relative w-48 h-48 mx-auto">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle 
                    cx="50%" cy="50%" r={radius} 
                    stroke="currentColor" strokeWidth="10" fill="transparent" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round" 
                    className={`${theme.ring} transition-all duration-1000 ease-out`} 
                />
            </svg>
            
            {/* Center Score Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className={`text-5xl font-black tracking-tighter ${theme.text}`}>
                    {biScore}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase mt-1">Out of 100</span>
            </div>
        </div>

        {/* Risk Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border ${theme.bg} ${theme.border} mt-4`}>
            <span className={theme.text}>{statusIcon}</span>
            <span className={`font-bold text-sm ${theme.text} uppercase tracking-wide`}>
                {riskBand}
            </span>
        </div>
      </div>

      {/* 2. Middle Section: Insights Card */}
      <div className="px-6 pb-6">
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Assessment Insight
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                {adviceText} <br/>
                <span className="text-xs text-slate-400 mt-2 block">
                    *Final eligibility is subject to lender verification and internal credit policies.
                </span>
            </p>
        </div>
      </div>

      {/* 3. Footer: Actions */}
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <button
          onClick={resetForm}
          className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          ↺ Recalculate
        </button>

        
      </div>
    </div>
  );
}