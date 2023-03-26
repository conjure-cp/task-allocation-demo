export default function KPI({ name, value, className }) {
  return (
    <div
      className={`w-60 space-y-2 border border-slate-600 bg-slate-800 p-4 ${className}`}
    >
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {name}
      </p>
      <p className={"text-3xl font-semibold"}>{value}</p>
    </div>
  );
}
