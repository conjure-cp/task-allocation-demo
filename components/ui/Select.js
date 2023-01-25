export default function Select({ label, placeholder, children, ...props }) {
  return (
    <div>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {label}
      </p>
      <select
        required
        className={
          "mt-1 w-72 border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm invalid:text-slate-500"
        }
        {...props}
      >
        <option value={-1} disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
}
