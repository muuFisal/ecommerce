import React from 'react';

interface BadgeProps {
  label: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, className = '' }) => {
  return (
    <span className={`inline-flex items-center rounded-full border border-border-subtle px-3 py-1 text-xs uppercase tracking-wide text-text-muted bg-bg-soft/80 ${className}`}>
      {label}
    </span>
  );
};