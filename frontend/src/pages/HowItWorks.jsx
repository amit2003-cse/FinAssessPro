import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, Briefcase, Landmark, Calculator, TrendingUp } from "lucide-react";


export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Tell Us About Yourself",
      description: "Start by providing basic details like your age and profession. We keep your data 100% secure.",
      icon: <User className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-100",
    },
    {
      id: 2,
      title: "Share Your Work Details",
      description: "Let us know your work experience and income stability, whether you are salaried or run a business.",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      id: 3,
      title: "Credit & Banking History",
      description: "Provide your estimated CIBIL score and past loan behavior. This helps us accurately gauge your creditworthiness.",
      icon: <Landmark className="w-8 h-8 text-amber-600" />,
      color: "bg-amber-100",
    },
    {
      id: 4,
      title: "Get Your BI Score",
      description: "Our intelligent algorithm analyzes your profile instantly and generates your unique Borrower Intelligence (BI) score.",
      icon: <Calculator className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-semibold text-sm">
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="text-emerald-600 w-5 h-5" />
            <span className="text-lg font-black tracking-tight text-slate-800">
              FinAssess<span className="text-emerald-600">Pro</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header Area */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            How It <span className="text-emerald-600">Works</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            FinAssessPro makes it incredibly simple to check your financial standing. 
            No complex jargon, just 4 easy steps to your instant score.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Step Number Background */}
              <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 opacity-50 group-hover:text-emerald-50 transition-colors pointer-events-none select-none">
                {step.id}
              </div>

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 ${step.color}`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10">
                {step.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          ))}

        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-emerald-600 rounded-3xl p-10 shadow-2xl shadow-emerald-200">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to check your score?</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            It takes less than 2 minutes and has zero impact on your actual credit score.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            Start Assessment Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </main>
      
      {/* Footer Minimal */}
      <footer className="text-center py-8 text-slate-400 text-sm">
        © 2025 Financial Assessment System
      </footer>
    </div>
  );
}
