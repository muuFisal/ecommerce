import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-slate-950 hover:bg-emerald-400 shadow-soft hover:-translate-y-0.5 focus-visible:ring-primary',
  secondary:
    'bg-bg-elevated text-text-main border border-border-subtle hover:bg-bg-soft focus-visible:ring-secondary',
  ghost:
    'bg-transparent text-text-main hover:bg-bg-soft border border-transparent focus-visible:ring-border-subtle',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};