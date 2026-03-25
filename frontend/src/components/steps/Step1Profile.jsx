import { useEffect } from "react"; // 1. useEffect import kiya
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../validation/step1Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step1Profile() {
  const { saveData, nextStep, formData } = useFormStore();

  // 2. First render par API call karne ke liye useEffect
  useEffect(() => {
    fetch('https://finassesspro.onrender.com')
      .then(() => {
        console.log('backend started');
      })
      .catch((error) => {
        console.error('Error starting backend:', error);
      });
  }, []); // Khali dependency array matlab "on mount"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: {
      fullName: formData.fullName,
      age: formData.age,
      mobile: formData.mobile,
      email: formData.email,
      applicantType: formData.applicantType,
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  // Reusable styles
  const labelStyle = "block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1";
  const inputStyle = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all duration-300 placeholder-slate-400 hover:border-slate-300 hover:bg-slate-50";
  const errorStyle = "text-red-500 text-[10px] mt-1 font-bold ml-1 animate-pulse";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Please provide your basic details to initiate the assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* ... baaki saara form inputs same rahega ... */}
        <div className="md:col-span-2">
          <label className={labelStyle}>Applicant Name</label>
          <input
            type="text"
            {...register("fullName")}
            className={inputStyle}
            placeholder="e.g. Amit Kumar"
          />
          {errors.fullName && <p className={errorStyle}>{errors.fullName.message}</p>}
        </div>

        <div>
          <label className={labelStyle}>Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={inputStyle}
            placeholder="18 - 75"
          />
          {errors.age && <p className={errorStyle}>{errors.age.message}</p>}
        </div>

        <div>
          <label className={labelStyle}>Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-400 text-sm border-r border-slate-300 pr-2">
              +91
            </span>
            <input
              type="text"
              maxLength={10}
              {...register("mobile")}
              className={`${inputStyle} pl-16`}
              placeholder="9876543210"
            />
          </div>
          {errors.mobile && <p className={errorStyle}>{errors.mobile.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>Email Address</label>
          <input
            type="email"
            {...register("email")}
            className={inputStyle}
            placeholder="amit@example.com"
          />
          {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelStyle}>Profession Type</label>
          <select
            {...register("applicantType")}
            className={`${inputStyle} appearance-none cursor-pointer bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_anchorunicode_f0d7.svg')] bg-[length:12px] bg-no-repeat bg-[right_1rem_center]`}
          >
            <option value="">Select your profession type</option>
            <option value="Salaried">Salaried</option>
            <option value="SEP">Self-Employed Professional</option>
            <option value="SENP">Self-Employed Non-Professional</option>
            <option value="Others">Others</option>
          </select>
          {errors.applicantType && <p className={errorStyle}>{errors.applicantType.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5"
        >
          Next Step &rarr;
        </button>
      </div>
    </form>
  );
}
