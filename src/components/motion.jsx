export default function Animate({ size = 80, className = "" }) {
  return (
    <div
      className={`bg-motion rounded-full z-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
