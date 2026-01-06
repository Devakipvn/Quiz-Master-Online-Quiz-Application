import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  children, 
  className,
  animate = true 
}) => {
  return (
    <div 
      className={cn(
        "quiz-card",
        animate && "animate-fade-in",
        className
      )}
    >
      {children}
    </div>
  );
};

export default QuizCard;
