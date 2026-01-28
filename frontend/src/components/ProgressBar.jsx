import { useFormStore } from "../store/useFormStore";

// Steps ke names ko change kiya gaya hai professional look ke liye
const steps = ["User Info", "Career Details", "Banking", "Assets", "Final Score"];

export default function ProgressBar() {
  const { step } = useFormStore();

  return (
    <div className="w-full px-4 py-6 bg-white rounded-lg shadow-sm mb-8">
      <div className="flex items-center justify-between relative">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = step >= stepNum;
          const isCompleted = step > stepNum;

          return (
            <div key={label} className="relative flex flex-col items-center flex-1">
              {/* Connector Line */}
              {index !== 0 && (
                <div 
                  className={`absolute left-[-50%] top-4 w-full h-[2px] -z-10 transition-colors duration-300 ${
                    isActive ? "bg-emerald-500" : "bg-slate-100"
                  }`}
                ></div>
              )}

              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-2 ${
                  isActive 
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200" 
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? "✓" : stepNum}
              </div>

              {/* Label */}
              <p 
                className={`text-[10px] md:text-xs mt-2 font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? "text-emerald-700" : "text-slate-400"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}