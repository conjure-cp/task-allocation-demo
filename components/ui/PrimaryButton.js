export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={`border py-2 px-2 hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
