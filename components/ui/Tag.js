export default function Tag({ children, className, ...props }) {
  return (
    <p
      className={`inline-block bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
