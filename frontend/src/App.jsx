import { useState, useRef } from "react";
import FormContainer from "./components/FormContainer";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, TrendingUp } from "lucide-react";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- PREMIUM NAVIGATION BAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">
              FinAssess<span className="text-emerald-600">Pro</span>
            </span>
          </div>
          
          <button 
            onClick={scrollToForm}
            className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-xl hover:shadow-slate-200 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">AI-Powered Risk Assessment</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Know Your <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Financial Worth</span> Before You Apply.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              Get an instant Borrower Intelligence (BI) Score based on 20+ parameters. Used by professionals to assess lending eligibility and risk profiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={scrollToForm}
                className="group w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:translate-y-0"
              >
                Start Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                How it works
              </button>
            </div>

            {/* Feature Tags */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 p-4 bg-white/50 border border-white rounded-2xl shadow-sm backdrop-blur-sm">
                <Zap className="text-amber-500 w-5 h-5" />
                <span className="font-bold text-slate-700 text-sm">Instant Score</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 border border-white rounded-2xl shadow-sm backdrop-blur-sm">
                <ShieldCheck className="text-emerald-500 w-5 h-5" />
                <span className="font-bold text-slate-700 text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 border border-white rounded-2xl shadow-sm backdrop-blur-sm">
                <CheckCircle2 className="text-blue-500 w-5 h-5" />
                <span className="font-bold text-slate-700 text-sm">Expert Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <div 
        ref={formRef}
        className={`transition-all duration-1000 ease-in-out ${showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`}
      >
        <div className="max-w-5xl mx-auto px-4 pb-32">
          {/* Section Divider with Label */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-slate-200"></div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Calculator Terminal</span>
            <div className="h-px w-12 bg-slate-200"></div>
          </div>
          
          <FormContainer />
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="text-emerald-600 w-5 h-5" />
            <span className="text-lg font-black tracking-tight text-slate-800">
              FinAssess<span className="text-emerald-600">Pro</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
            Providing transparency and intelligence to the lending ecosystem with cutting-edge analytical tools.
          </p>
          <div className="h-px w-full max-w-xs bg-slate-200 mx-auto mb-8"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2025 Financial Assessment System | Developed by Amit Kumar
          </p>
        </div>
      </footer>
    </div>
  );
}