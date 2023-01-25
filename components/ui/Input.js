export default function Input({ label, placeholder, width = "w-72", className, ...props }) {
  return (
    <div>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {label}
      </p>
      <input
        type={"text"}
        className={`mt-1 ${width} border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm placeholder-slate-500 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
