import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  label: string;
  option: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  label,
  option,
  isSelected,
  isCorrect,
  showResult = false,
  disabled = false,
  onClick,
}) => {
  const getStateClass = () => {
    if (showResult && isSelected) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    if (isSelected) return 'selected';
    return '';
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "option-card w-full text-left group",
        getStateClass(),
        disabled && "disabled"
      )}
    >
      {/* Option Label (A, B, C, D) */}
      <div 
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200",
          isSelected 
            ? showResult 
              ? isCorrect 
                ? "bg-success text-success-foreground" 
                : "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground group-hover:bg-primary/20"
        )}
      >
        {showResult && isSelected ? (
          isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
        ) : (
          label
        )}
      </div>

      {/* Option Text */}
      <span className="flex-1 font-medium">{option}</span>

      {/* Selection Indicator */}
      <div 
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          isSelected 
            ? showResult
              ? isCorrect 
                ? "border-success bg-success" 
                : "border-destructive bg-destructive"
              : "border-primary bg-primary"
            : "border-border group-hover:border-primary/50"
        )}
      >
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-card" />
        )}
      </div>
    </button>
  );
};

export default OptionCard;
