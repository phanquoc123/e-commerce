interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <a href="/" className={`text-2xl font-bold ${className}`}>
      <img 
        src="/logo/iconlogo.webp" 
        alt="YODY Logo" 
        className="w-14 h-auto"
        loading="lazy" 
      />
    </a>
  );
}
