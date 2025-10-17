'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

// Clases CSS para cada variante
const variantClasses = {
  default: 'bg-white border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg',
  flat: 'bg-gray-50 border border-gray-100',
};

// Clases CSS para cada tamaño
const sizeClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// Clases CSS para hover
const hoverClasses = 'transition-all duration-200 hover:shadow-md hover:scale-105';

export default function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  variant = 'default',
  size = 'md',
  hover = false,
  className = '',
  onClick,
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';
  const interactiveClasses = onClick ? 'cursor-pointer' : '';
  const hoverEffectClasses = hover ? hoverClasses : '';

  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${interactiveClasses}
    ${hoverEffectClasses}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Header personalizado o título/subtítulo */}
      {header ? (
        <div className="mb-4">
          {header}
        </div>
      ) : (title || subtitle) ? (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      ) : null}

      {/* Contenido principal */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
