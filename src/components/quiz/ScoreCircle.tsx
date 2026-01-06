import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreCircleProps {
  percentage: number;
  passed: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ 
  percentage, 
  passed,
  size = 'lg' 
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const textSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const strokeWidth = size === 'lg' ? 8 : size === 'md' ? 6 : 4;
  const radius = size === 'lg' ? 70 : size === 'md' ? 56 : 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative", sizeClasses[size])}>
      <svg className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            "transition-all duration-1000 ease-out",
            passed ? "text-success" : "text-destructive"
          )}
          style={{
            animation: 'progress-fill 1.5s ease-out forwards',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", textSizeClasses[size], passed ? "text-success" : "text-destructive")}>
          {percentage}%
        </span>
        <span className="text-sm text-muted-foreground font-medium">Score</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
