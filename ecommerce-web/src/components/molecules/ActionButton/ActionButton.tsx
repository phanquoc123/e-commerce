import React from 'react';

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function ActionButton({
  onClick,
  disabled = false,
  children,
  icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ariaLabel,
  type = 'button',
}: ActionButtonProps) {
  const baseClasses = "focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-brand-surface text-theme-text hover:bg-brand-surface-hover [&_svg]:text-theme-text",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 [&_svg]:text-gray-900",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 [&_svg]:text-gray-700"
  };
  
  const sizeClasses = {
    sm: "h-9 px-3 py-2 text-sm [&_svg]:size-4",
    md: "h-11 px-4 py-3 text-label-md [&_svg]:size-5",
    lg: "h-12 px-6 py-4 text-lg [&_svg]:size-6"
  };
  
  const widthClasses = fullWidth ? "w-full" : "";
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;
  
  const iconSpanClasses = "focus-visible:ring-ring rounded-rounded [&_svg]:pointer-events-none [&_svg]:shrink-0 inline-flex size-5 min-w-5 items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";
  
  // Default arrow icon if no icon provided
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {children}
      <span className={iconSpanClasses}>
        {icon || defaultIcon}
      </span>
    </button>
  );
}
