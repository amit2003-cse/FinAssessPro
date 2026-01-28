import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2BSchema } from "../../validation/step2BSchema";
import { useFormStore } from "../../store/useFormStore";
import RadioGroup from "../common/RadioGroup";
import { useEffect } from "react";

export default function Step2BBusiness() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2BSchema),
    mode: "onBlur",
    defaultValues: {
      businessExperience: formData.businessExperience ?? "",
      gstRegistered: formData.gstRegistered ?? undefined,
      gstVintage: formData.gstVintage ?? "",
      turnoverTrend: formData.turnoverTrend ?? "",
      profitTrend: formData.profitTrend ?? "",
      capitalTrend: formData.capitalTrend ?? "",
    },
  });

  const gstRegistered = watch("gstRegistered");

  useEffect(() => {
    if (gstRegistered === false) {
      setValue("gstVintage", "");
      clearErrors("gstVintage");
    }
  }, [gstRegistered, setValue, clearErrors]);

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  // Reusable Styles (Consistent with Step 1 & 2A)
  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";
  const inputStyle = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200";
  const selectStyle = `${inputStyle} appearance-none cursor-pointer bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_anchorunicode_f0d7.svg')] bg-[length:12px] bg-no-repeat bg-[right_1rem_center]`;
  const errorStyle = "text-red-500 text-xs mt-1 font-medium ml-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Business Profile
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Details regarding your business vintage and financial stability.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        
        {/* ROW 1: Experience & GST Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Years of Business Experience */}
          <div>
            <label className={labelStyle}>Business Experience</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                {...register("businessExperience", { valueAsNumber: true })}
                className={`${inputStyle} pr-16`}
                placeholder="e.g. 5"
              />
              <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">
                Years
              </span>
            </div>
            {errors.businessExperience && <p className={errorStyle}>{errors.businessExperience.message}</p>}
          </div>

          {/* GST Registered? - Needs styling in the Child Component mostly, but wrapped nicely here */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <RadioGroup
              label="GST Registered?"
              name="gstRegistered"
              control={control}
              error={errors.gstRegistered}
              // Note: Make sure your RadioGroup component supports passing styles or update it to match the theme
            />
          </div>
        </div>

        {/* Conditional Field: GST Vintage */}
        {gstRegistered === true && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
             <label className="block text-sm font-semibold text-emerald-800 mb-2">
                GST Vintage (Registration Age)
             </label>
             <div className="relative bg-white rounded-lg">
                <input
                  type="number"
                  min="0"
                  {...register("gstVintage", { valueAsNumber: true })}
                  className={`${inputStyle} pr-16 border-emerald-200 focus:border-emerald-500`}
                  placeholder="e.g. 3"
                />
                <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">
                  Years
                </span>
             </div>
             {errors.gstVintage && <p className={errorStyle}>{errors.gstVintage.message}</p>}
          </div>
        )}

        {/* SECTION: Financial Trends */}
        <div className="pt-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4">
              Financial Trends (Last 2-3 Years)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Turnover Trend */}
              <div>
                <label className={labelStyle}>Turnover</label>
                <select {...register("turnoverTrend")} className={selectStyle}>
                  <option value="">Select Trend</option>
                  <option value="Positive">📈 Positive</option>
                  <option value="Flat">➖ Flat</option>
                  <option value="Negative">📉 Negative</option>
                </select>
                {errors.turnoverTrend && <p className={errorStyle}>{errors.turnoverTrend.message}</p>}
              </div>

              {/* Profit Trend */}
              <div>
                <label className={labelStyle}>Net Profit</label>
                <select {...register("profitTrend")} className={selectStyle}>
                  <option value="">Select Trend</option>
                  <option value="Positive">📈 Positive</option>
                  <option value="Flat">➖ Flat</option>
                  <option value="Negative">📉 Negative</option>
                </select>
                {errors.profitTrend && <p className={errorStyle}>{errors.profitTrend.message}</p>}
              </div>

              {/* Capital Trend */}
              <div>
                <label className={labelStyle}>Capital / Net Worth</label>
                <select {...register("capitalTrend")} className={selectStyle}>
                  <option value="">Select Trend</option>
                  <option value="Positive">📈 Positive</option>
                  <option value="Stable">➖ Stable</option>
                  <option value="Declining">📉 Declining</option>
                </select>
                {errors.capitalTrend && <p className={errorStyle}>{errors.capitalTrend.message}</p>}
              </div>
            </div>
        </div>
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