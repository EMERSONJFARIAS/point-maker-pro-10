
import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  withText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, withText = true, size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Clock 
          className={cn(
            'text-primary animate-pulse-subtle', 
            sizes[size]
          )} 
          strokeWidth={1.5} 
        />
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-md -z-10"></div>
      </div>
      
      {withText && (
        <div className={cn('font-semibold tracking-tight leading-none', textSizes[size])}>
          <span>Point</span>
          <span className="text-primary">Maker</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
