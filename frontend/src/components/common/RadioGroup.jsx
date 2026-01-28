import { Controller } from "react-hook-form";

export default function RadioGroup({ label, name, control, error }) {
  return (
    <div className="mb-6">
      <p className="block text-sm font-semibold text-slate-700 mb-2">{label}</p>

      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="flex gap-4">
            {/* OPTION: YES */}
            <div
              onClick={() => field.onChange(true)}
              className={`flex-1 cursor-pointer py-3 px-4 rounded-lg border text-center transition-all duration-200 select-none flex items-center justify-center gap-2 ${
                field.value === true
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                 field.value === true ? "border-white" : "border-slate-400"
              }`}>
                {field.value === true && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="font-medium">Yes</span>
            </div>

            {/* OPTION: NO */}
            <div
              onClick={() => field.onChange(false)}
              className={`flex-1 cursor-pointer py-3 px-4 rounded-lg border text-center transition-all duration-200 select-none flex items-center justify-center gap-2 ${
                field.value === false
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-slate-50"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                 field.value === false ? "border-white" : "border-slate-400"
              }`}>
                {field.value === false && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="font-medium">No</span>
            </div>
            
            {/* Hidden Input for Form Logic (Optional functionality safeguard) */}
            <input 
                type="hidden" 
                {...field} 
                value={field.value !== undefined ? field.value.toString() : ""} 
            />
          </div>
        )}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
}