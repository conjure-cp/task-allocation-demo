export default function PrimaryButton({ id, children, className, ...props }) {
  return (
    <button
      id={id}
      className={`border py-2 px-2 hover:underline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
