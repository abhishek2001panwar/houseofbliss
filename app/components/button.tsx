import React from 'react';

interface ButtonProps {
  variant?: 'outline' | 'filled';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'outline', children, className = '' }) => {
  // Colors from images
  const filledBg = '#fdf9dc'; // second image bg
  const outlineText = '#5a5a4c'; // first image text color

  return (
    <button
      className={
        `relative px-8 py-4 font-neue-regular text-lg border ` +
        `${variant === 'outline' ? `border-[${outlineText}] text-[${outlineText}] bg-transparent overflow-hidden` : `bg-[${filledBg}] text-[${outlineText}] border-[${outlineText}]`} ` +
        `transition-colors duration-300 ` +
        `${className}`
      }
      style={{
        borderColor: outlineText,
        backgroundColor: variant === 'filled' ? filledBg : 'transparent',
        color: outlineText,
        fontFamily: 'var(--font-neue-regular)'
      }}
    >
      {/* Outline variant hover effect */}
      {variant === 'outline' && (
        <span
          className="absolute inset-0 bg-black z-0 scale-y-0 origin-bottom transition-transform duration-300 hover:scale-y-100"
          style={{ borderRadius: 'inherit' }}
        />
      )}
      <span
        className={
          variant === 'outline'
            ? 'relative z-10 transition-colors duration-300 '
            : 'relative z-10'
        }
      >
        {children}
      </span>
    </button>
  );
};

export default Button;