import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  children, 
  className,
  animate = true,
  style,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "quiz-card",
        animate && "animate-fade-in",
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default QuizCard;
