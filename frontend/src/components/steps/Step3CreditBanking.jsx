import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../validation/step3Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step3CreditBanking() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: {
      cibilScore: formData.cibilScore,
      runningLoans: formData.runningLoans,
      closedLoans: formData.closedLoans,
      bounces6Months: formData.bounces6Months,
      bounces3Months: formData.bounces3Months,
      avgBankBalance: formData.avgBankBalance,
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep(); 
  };

  // Consistent Style System
  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";
  const inputStyle = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-slate-400";
  const selectStyle = `${inputStyle} appearance-none cursor-pointer bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_anchorunicode_f0d7.svg')] bg-[length:12px] bg-no-repeat bg-[right_1rem_center]`;
  const errorStyle = "text-red-500 text-xs mt-1 font-medium ml-1";
  const sectionTitleStyle = "text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Credit & Banking
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Your credit history helps us calculate accurate eligibility.
        </p>
      </div>

      {/* SECTION 1: CIBIL SCORE */}
      <div className="mb-8">
        <label className={labelStyle}>Current CIBIL Score</label>
        <select {...register("cibilScore")} className={selectStyle}>
          <option value="">Select your CIBIL Score</option>
          <option value="-1">No History / -1</option>
          {Array.from({ length: 61 }, (_, i) => 300 + i * 10).map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
        {errors.cibilScore && <p className={errorStyle}>{errors.cibilScore.message}</p>}
      </div>

      {/* SECTION 2: LOAN HISTORY */}
      <div className="mb-8">
        <h3 className={sectionTitleStyle}>Loan Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Running Loans */}
          <div>
            <label className={labelStyle}>Active Loans</label>
            <div className="relative">
                <input
                type="number"
                min="0"
                {...register("runningLoans", { valueAsNumber: true })}
                className={inputStyle}
                placeholder="0"
                />
                <span className="absolute right-4 top-3.5 text-slate-400 text-xs">Nos.</span>
            </div>
            {errors.runningLoans && <p className={errorStyle}>{errors.runningLoans.message}</p>}
          </div>

          {/* Closed Loans */}
          <div>
            <label className={labelStyle}>Closed Loans</label>
            <div className="relative">
                <input
                type="number"
                min="0"
                {...register("closedLoans", { valueAsNumber: true })}
                className={inputStyle}
                placeholder="0"
                />
                <span className="absolute right-4 top-3.5 text-slate-400 text-xs">Nos.</span>
            </div>
            {errors.closedLoans && <p className={errorStyle}>{errors.closedLoans.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 3: REPAYMENT TRACK RECORD */}
      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
        <h3 className={`${sectionTitleStyle} !mt-0 !text-slate-500`}>Repayment Behavior (Bounces)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bounces – 6 Months */}
            <div>
                <label className={labelStyle}>Last 6 Months</label>
                <input
                type="number"
                min="0"
                {...register("bounces6Months", { valueAsNumber: true })}
                className={`${inputStyle} bg-white`}
                placeholder="e.g. 0"
                />
                {errors.bounces6Months && <p className={errorStyle}>{errors.bounces6Months.message}</p>}
            </div>

            {/* Bounces – 3 Months */}
            <div>
                <label className={labelStyle}>Last 3 Months</label>
                <input
                type="number"
                min="0"
                {...register("bounces3Months", { valueAsNumber: true })}
                className={`${inputStyle} bg-white`}
                placeholder="e.g. 0"
                />
                {errors.bounces3Months && <p className={errorStyle}>{errors.bounces3Months.message}</p>}
            </div>
        </div>
      </div>

      {/* SECTION 4: BANKING */}
      <div className="mb-8">
        <label className={labelStyle}>Average Bank Balance (Last 6 Months)</label>
        <div className="relative">
            <select {...register("avgBankBalance")} className={`${selectStyle} pl-10`}>
            <option value="">Select Range</option>
            <option value="Below 50000">Less than ₹50,000</option>
            <option value="50000-200000">₹50,000 – ₹2,00,000</option>
            <option value="200000-500000">₹2,00,000 – ₹5,00,000</option>
            <option value="Above 500000">More than ₹5,00,000</option>
            </select>
            {/* Wallet Icon */}
            <span className="absolute left-3 top-3.5 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </span>
        </div>
        {errors.avgBankBalance && <p className={errorStyle}>{errors.avgBankBalance.message}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center gap-2 hover:bg-slate-50 rounded-lg"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-emerald-500/30"
        >
          Next Step &rarr;
        </button>
      </div>
    </form>
  );
}