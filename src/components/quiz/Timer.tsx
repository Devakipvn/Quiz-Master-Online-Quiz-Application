import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuiz } from '@/contexts/QuizContext';

interface TimerProps {
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const { timeRemaining, setTimeRemaining, isTimerRunning, setIsTimerRunning } = useQuiz();

  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isTimerRunning, setTimeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      onTimeUp?.();
    }
  }, [timeRemaining, isTimerRunning, setIsTimerRunning, onTimeUp]);

  const isWarning = timeRemaining <= 10;
  const isCritical = timeRemaining <= 5;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300",
        isCritical 
          ? "bg-destructive/10 text-destructive animate-timer-pulse" 
          : isWarning 
            ? "bg-accent/10 text-accent" 
            : "bg-primary/10 text-primary"
      )}
    >
      <Clock className={cn("w-5 h-5", isCritical && "animate-pulse")} />
      <span className="text-lg tabular-nums">{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
