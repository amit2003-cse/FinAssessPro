import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "../../validation/step4Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step4Strength() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step4Schema),
    mode: "onBlur",
    defaultValues: {
      totalAssets: formData.totalAssets,
      totalOutstandingLoans: formData.totalOutstandingLoans,
      declaration: false,
    },
  });

  const totalAssets = watch("totalAssets");
  const totalOutstandingLoans = watch("totalOutstandingLoans");

  // ✅ AUTO CALCULATION LOGIC
  const ratio =
    totalAssets && totalOutstandingLoans && totalOutstandingLoans > 0
      ? (totalAssets / totalOutstandingLoans).toFixed(2)
      : null;

  const onSubmit = (data) => {
    saveData({
      ...data,
      netWorthBorrowingRatio: ratio,
    });
    nextStep(); 
  };

  // Consistent Design Styles
  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";
  const inputStyle = "w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-slate-400";
  const errorStyle = "text-red-500 text-xs mt-1 font-medium ml-1";
  const helperTextStyle = "text-xs text-slate-400 mt-1 ml-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Financial Strength
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Compare your assets against liabilities to determine net worth strength.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        
        {/* Total Assets */}
        <div>
          <label className={labelStyle}>Total Assets Value</label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-slate-400 font-semibold">₹</span>
            <input
              type="number"
              min="0"
              {...register("totalAssets", { valueAsNumber: true })}
              className={inputStyle}
              placeholder="e.g. 50,00,000"
            />
          </div>
          <p className={helperTextStyle}>
            Include property, investments, gold, and business assets.
          </p>
          {errors.totalAssets && <p className={errorStyle}>{errors.totalAssets.message}</p>}
        </div>

        {/* Total Outstanding Loans */}
        <div>
          <label className={labelStyle}>Total Outstanding Loans</label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-slate-400 font-semibold">₹</span>
            <input
              type="number"
              min="0"
              {...register("totalOutstandingLoans", { valueAsNumber: true })}
              className={inputStyle}
              placeholder="e.g. 20,00,000"
            />
          </div>
          <p className={helperTextStyle}>
            Sum of all active loan principals (Home, Car, Personal, etc).
          </p>
          {errors.totalOutstandingLoans && <p className={errorStyle}>{errors.totalOutstandingLoans.message}</p>}
        </div>
      </div>

      {/* Auto Calculated Ratio Card */}
      <div className="mb-8 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-emerald-900">
                Net Worth Ratio
                </p>
                <p className="text-xs text-emerald-600/80 mt-1">
                (Assets ÷ Liabilities)
                </p>
            </div>
            <div className="text-right">
                <p className={`text-3xl font-bold tracking-tight ${ratio ? "text-emerald-600" : "text-slate-300"}`}>
                    {ratio ? ratio : "--"}
                </p>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Calculated
                </span>
            </div>
        </div>
        
        {/* Visual Bar for Ratio context */}
        {ratio && (
            <div className="mt-4">
                <p className="text-xs text-emerald-700 mb-1">
                    {Number(ratio) > 1.5 ? "Strong Position ✅" : "Moderate Position ⚠️"}
                </p>
                <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(Number(ratio) * 20, 100)}%` }} // Visual logic just for animation
                    ></div>
                </div>
            </div>
        )}
      </div>

      {/* Declaration Checkbox */}
      <div className="mb-8">
        <label className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
          <div className="relative flex items-center">
            <input 
                type="checkbox" 
                {...register("declaration")} 
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400 focus:ring-1 focus:ring-emerald-500/20"
            />
            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 14 14" fill="none">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors pt-0.5">
            I confirm that the information provided above is accurate and true to the best of my knowledge.
          </span>
        </label>
        {errors.declaration && <p className="text-red-500 text-xs ml-1">{errors.declaration.message}</p>}
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
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-emerald-500/30 flex items-center gap-2"
        >
          Calculate Result ✨
        </button>
      </div>
    </form>
  );
}