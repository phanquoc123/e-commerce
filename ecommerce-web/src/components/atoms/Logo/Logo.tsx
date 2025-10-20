interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a href="/" className={`text-2xl font-bold ${className}`}>
      <img
        src="/logo/logo.svg"
        alt="YODY Logo"
        className="h-8 min-h-8 w-8 min-w-fit"
        loading="lazy"
      />
    </a>
  );
}
