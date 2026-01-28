import { useFormStore } from "../store/useFormStore";

import ProgressBar from "../components/ProgressBar";
import Step1Profile from "./steps/Step1Profile";
import Step2AEmployment from "./steps/Step2AEmployment";
import Step2BBusiness from "./steps/Step2BBusiness";
import Step3CreditBanking from "./steps/Step3CreditBanking";
import Step4Strength from "./steps/Step4Strength";
import Result from "./steps/Result";

export default function FormContainer() {
  const { step, formData } = useFormStore();

  return (
    // 1. Full Page Background (Light Slate for contrast)
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* 2. Main Card Container (White with Soft Shadow) */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl shadow-emerald-100/50 border border-slate-100 overflow-hidden">
        
        {/* Optional: Branding / Header Area */}
        <div className="bg-emerald-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Financial Health Check
            </h1>
            <p className="text-emerald-100 text-sm mt-1">
              Calculate your eligibility score in 5 simple steps
            </p>
        </div>

        {/* 3. Form Content Area */}
        <div className="p-6 md:p-10">
          <ProgressBar />

          <div className="mt-8 animate-fadeIn">
            {/* STEP 1: PROFILE */}
            {step === 1 && <Step1Profile />}

            {/* STEP 2: CONDITIONAL (SALARIED / BUSINESS) */}
            {step === 2 &&
              (formData.applicantType === "Salaried" ? (
                <Step2AEmployment />
              ) : (
                <Step2BBusiness />
              ))}

            {/* STEP 3: CREDIT & BANKING */}
            {step === 3 && <Step3CreditBanking />}

            {/* STEP 4: FINANCIAL STRENGTH */}
            {step === 4 && <Step4Strength />}

            {/* STEP 5: RESULT */}
            {step === 5 && <Result />}
          </div>
        </div>
      </div>
    </div>
  );
}