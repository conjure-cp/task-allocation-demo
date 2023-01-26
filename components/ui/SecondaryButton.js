export default function SecondaryButton({ children, className, ...props }) {
  return (
    <button className={`text-sm hover:underline ${className}`} {...props}>
      {children}
    </button>
  );
}
