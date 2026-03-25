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
    <div className="animate-in fade-in zoom-in duration-700 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-2xl mx-auto">
      
      {/* 1. Header: Score Visualization */}
      <div className="pt-12 pb-10 px-8 text-center relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Decorative Background Elements */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 ${theme.bg} rounded-full blur-3xl opacity-30`}></div>
        <div className={`absolute -bottom-24 -left-24 w-64 h-64 ${theme.bg} rounded-full blur-3xl opacity-20`}></div>

        <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-1">Assessment Result</h2>
        <p className="text-slate-400 text-xs font-bold mb-8 uppercase tracking-tighter">Verified by FinAssess Intelligence Engine</p>

        {/* Circular Gauge */}
        <div className="relative w-56 h-56 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                    cx="50%" cy="50%" r={radius} 
                    stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round" 
                    className={`${theme.ring} transition-all duration-1500 ease-out`} 
                />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className={`text-6xl font-black tracking-tighter ${theme.text} animate-pulse-slow`}>
                    {biScore}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">BI Score</span>
            </div>
        </div>

        {/* Risk Badge */}
        <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border ${theme.bg} ${theme.border} shadow-sm`}>
            <div className={`w-2.5 h-2.5 rounded-full ${colorTheme === 'emerald' ? 'bg-emerald-500' : colorTheme === 'amber' ? 'bg-amber-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`font-black text-sm ${theme.text} uppercase tracking-wider`}>
                {riskBand}
            </span>
        </div>
      </div>

      {/* 2. Insights & Action Blocks */}
      <div className="px-8 pb-10 space-y-6">
        {/* Insight Card */}
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 relative group">
            <div className="absolute top-4 right-4 text-slate-200 group-hover:text-slate-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Expert Analysis</h3>
            <p className="text-slate-700 font-semibold leading-relaxed">
                {adviceText}
            </p>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed italic">
                *This score is generated based on self-declared data. Lenders may perform additional verification.
            </p>
        </div>

        {/* Next Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Download Report</h4>
            <p className="text-xs text-slate-500">Get a detailed PDF analysis.</p>
          </div>
          
          <div className="p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Talk to Expert</h4>
            <p className="text-xs text-slate-500">Free 15-min consultation.</p>
          </div>
        </div>
      </div>

      {/* 3. Footer Actions */}
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex gap-3">
        <button
          onClick={resetForm}
          className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Recalculate
        </button>
        <button
          className="flex-1 px-6 py-4 bg-slate-900 border border-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
        >
          Done
        </button>
      </div>
    </div>
  );
}