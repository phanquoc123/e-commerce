interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({ 
  message = 'Loading categories...', 
  className = '' 
}: LoadingStateProps) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[60] bg-white shadow-2xl ${className}`}
      style={{ height: '100vh' }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">{message}</div>
      </div>
    </div>
  );
}
