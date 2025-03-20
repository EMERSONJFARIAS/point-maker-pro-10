
import React from 'react';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  rightImage?: boolean;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  rightImage = true,
  className,
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 shadow-elevation rounded-2xl overflow-hidden animate-fade-in">
        {/* Content Side */}
        <div 
          className={cn(
            "w-full flex flex-col p-6 sm:p-8 md:p-12",
            rightImage ? "lg:order-1" : "lg:order-2",
            className
          )}
        >
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          <div className="flex-1">
            {children}
          </div>
        </div>
        
        {/* Image/Gradient Side */}
        <div className={cn(
          "hidden lg:block relative",
          rightImage ? "lg:order-2" : "lg:order-1"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] mix-blend-overlay opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/30 to-primary/80"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
            <div className="glass-panel p-8 max-w-sm text-white">
              <h3 className="text-2xl font-medium mb-4">Controle de Ponto Digital</h3>
              <p className="opacity-90">Registre e gerencie o ponto dos seus funcionários com facilidade, simplicidade e elegância.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
