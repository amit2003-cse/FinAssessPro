import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2ASchema } from "../../validation/step2ASchema";
import { useFormStore } from "../../store/useFormStore";

export default function Step2AEmployment() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2ASchema),
    mode: "onBlur",
    defaultValues: {
      totalExperience: formData.totalExperience,
      currentOrgExperience: formData.currentOrgExperience,
      employerType: formData.employerType,
      designation: formData.designation,
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep(); 
  };

  // Consistent Design System
  const labelStyle = "block text-sm font-semibold text-slate-700 mb-2";
  const inputStyle = "w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 placeholder-slate-400";
  const errorStyle = "text-red-500 text-xs mt-1 font-medium ml-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Career Details
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Tell us about your current employment status and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Total Work Experience */}
        <div>
          <label className={labelStyle}>Total Work Experience</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              {...register("totalExperience", { valueAsNumber: true })}
              className={`${inputStyle} pr-16`} // Padding right for suffix
              placeholder="e.g. 5.5"
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">
              Years
            </span>
          </div>
          {errors.totalExperience && <p className={errorStyle}>{errors.totalExperience.message}</p>}
        </div>

        {/* Current Org Experience */}
        <div>
          <label className={labelStyle}>Current Experience</label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              {...register("currentOrgExperience", { valueAsNumber: true })}
              className={`${inputStyle} pr-16`}
              placeholder="e.g. 2.0"
            />
            <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">
              Years
            </span>
          </div>
          {errors.currentOrgExperience && <p className={errorStyle}>{errors.currentOrgExperience.message}</p>}
        </div>

        {/* Nature of Employer */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Nature of Employer</label>
          <select
            {...register("employerType")}
            className={`${inputStyle} appearance-none cursor-pointer bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_anchorunicode_f0d7.svg')] bg-[length:12px] bg-no-repeat bg-[right_1rem_center]`}
          >
            <option value="">Select Employer Type</option>
            <option value="Government">Government / Public Sector</option>
            <option value="PSU">Public Sector Undertaking (PSU)</option>
            <option value="Private Limited">Private Limited Company</option>
            <option value="Partnership / Proprietorship">Partnership / Proprietorship</option>
            <option value="MNC">Multinational Corporation (MNC)</option>
          </select>
          {errors.employerType && <p className={errorStyle}>{errors.employerType.message}</p>}
        </div>

        {/* Designation */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Designation / Role</label>
          <input
            type="text"
            {...register("designation")}
            className={inputStyle}
            placeholder="e.g. Senior Software Engineer"
          />
          {errors.designation && <p className={errorStyle}>{errors.designation.message}</p>}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        
        {/* Back Button - Secondary Style */}
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 text-slate-600 font-medium hover:text-slate-900 transition-colors flex items-center gap-2 hover:bg-slate-50 rounded-lg"
        >
          &larr; Back
        </button>

        {/* Next Button - Primary Style */}
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