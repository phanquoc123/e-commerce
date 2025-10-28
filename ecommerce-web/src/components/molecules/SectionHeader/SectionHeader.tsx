import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
}

export default function SectionHeader({ 
  icon, 
  title, 
  className = '',
  iconSize = 'md' 
}: SectionHeaderProps) {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-4 lg:size-5',
    lg: 'size-5 lg:size-6'
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className={sizeClasses[iconSize]}>
        {icon}
      </div>
      <p className="text-theme-text text-label-md lg:text-label-lg">{title}</p>
    </div>
  );
}


