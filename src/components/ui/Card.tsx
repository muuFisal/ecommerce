import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`glass-card rounded-3xl border border-border-subtle/60 bg-bg-elevated/80 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
};