
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'black';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-7 py-3.5 uppercase text-sm font-bold tracking-wide transition duration-300 disabled:opacity-50";

  const variantClasses = {
    primary: "bg-brand-orange text-white hover:bg-brand-orange-light",
    secondary: "bg-transparent text-black border border-black hover:bg-black hover:text-white",
    tertiary: "bg-transparent text-gray-500 hover:text-brand-orange font-bold",
    black: "bg-black text-white hover:bg-gray-700",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
