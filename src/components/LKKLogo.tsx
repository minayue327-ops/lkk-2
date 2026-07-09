import React from 'react';

interface LKKLogoProps {
  className?: string;
  isLight?: boolean;
}

export default function LKKLogo({ className = '', isLight = false }: LKKLogoProps) {
  return (
    <div id="lkk-logo" className={`flex items-center select-none ${className}`}>
      <img 
        src="/src/assets/images/lkk_logo.png" 
        alt="LKK 洛可可" 
        className={`h-10 w-auto object-contain ${isLight ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}
