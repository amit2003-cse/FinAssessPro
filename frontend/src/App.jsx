import FormContainer from "./components/FormContainer";

export default function App() {
  return (
    // Background updated to slate-50 to match the clean theme
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      
      <div className="w-full max-w-4xl">
        {/* Header Section - Centered and Modern */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-800 tracking-tight">
            FinAssess<span className="text-emerald-500">Pro</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
            Advanced Borrower Eligibility & Risk Assessment
          </p>
        </div>

        {/* Main Form Container Injection */}
        {/* Note: Agar aapne mere pichle code wala FormContainer use kiya hai (jisme already white card tha), 
            toh yahan extra shadow/bg lagane ki zarurat nahi hai. */}
        <div className="w-full">
           <FormContainer />
        </div>

        {/* Footer for LinkedIn Branding */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>© 2025 Financial Assessment System | Developed by Amit Kumar</p>
        </div>
      </div>
    </div>
  );
}