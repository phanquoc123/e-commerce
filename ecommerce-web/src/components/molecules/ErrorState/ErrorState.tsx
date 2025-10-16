interface ErrorStateProps {
  message: string;
  className?: string;
}

export default function ErrorState({ 
  message, 
  className = '' 
}: ErrorStateProps) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[60] bg-white shadow-2xl ${className}`}
      style={{ height: '100vh' }}
    >
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-600">Error loading categories: {message}</div>
      </div>
    </div>
  );
}
