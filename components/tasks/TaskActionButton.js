export default function TaskActionButton({
  children,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`text-sm ${disabled ? "opacity-50" : "hover:underline"}`}
      {...props}
    >
      {children}
    </button>
  );
}
