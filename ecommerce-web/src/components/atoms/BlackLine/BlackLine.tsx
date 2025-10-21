export default function BlackLine({ className }: { className?: string }) {
  return <div className={`h-px border-b border-dashed bg-gray-300 ${className}`}></div>;
}
