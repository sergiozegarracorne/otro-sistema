'use client';

import { ReactNode } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  text?: string;
  overlay?: boolean;
  children?: ReactNode;
}

// Clases CSS para cada tamaño
const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

// Componente Spinner
function Spinner({ size = 'md' }: { size: LoadingProps['size'] }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
  );
}

// Componente Dots
function Dots({ size = 'md' }: { size: LoadingProps['size'] }) {
  const dotSize = size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3';
  
  return (
    <div className="flex space-x-1">
      <div className={`${dotSize} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div className={`${dotSize} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div className={`${dotSize} bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );
}

// Componente Pulse
function Pulse({ size = 'md' }: { size: LoadingProps['size'] }) {
  return (
    <div className={`animate-pulse rounded-full bg-blue-600 ${sizeClasses[size]}`} />
  );
}

// Componente Bars
function Bars({ size = 'md' }: { size: LoadingProps['size'] }) {
  const barHeight = size === 'sm' ? 'h-3' : size === 'lg' ? 'h-8' : 'h-6';
  
  return (
    <div className="flex space-x-1">
      <div className={`${barHeight} w-1 bg-blue-600 rounded animate-pulse`} style={{ animationDelay: '0ms' }} />
      <div className={`${barHeight} w-1 bg-blue-600 rounded animate-pulse`} style={{ animationDelay: '150ms' }} />
      <div className={`${barHeight} w-1 bg-blue-600 rounded animate-pulse`} style={{ animationDelay: '300ms' }} />
      <div className={`${barHeight} w-1 bg-blue-600 rounded animate-pulse`} style={{ animationDelay: '450ms' }} />
    </div>
  );
}

export default function Loading({
  size = 'md',
  variant = 'spinner',
  text,
  overlay = false,
  children,
}: LoadingProps) {
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <Dots size={size} />;
      case 'pulse':
        return <Pulse size={size} />;
      case 'bars':
        return <Bars size={size} />;
      default:
        return <Spinner size={size} />;
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderLoader()}
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        {content}
      </div>
    );
  }

  if (children) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
