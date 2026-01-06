import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unansweredCount: number;
  totalQuestions: number;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  unansweredCount,
  totalQuestions,
}) => {
  const hasUnanswered = unansweredCount > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4">
            {hasUnanswered ? (
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-accent" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            )}
          </div>
          <DialogTitle className="text-center text-xl">
            {hasUnanswered ? 'Submit with Unanswered Questions?' : 'Ready to Submit?'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {hasUnanswered ? (
              <>
                You have <span className="font-semibold text-accent">{unansweredCount}</span> unanswered 
                {unansweredCount === 1 ? ' question' : ' questions'} out of {totalQuestions}.
                <br />
                <span className="text-muted-foreground">
                  Unanswered questions will be marked as incorrect.
                </span>
              </>
            ) : (
              <>
                You have answered all {totalQuestions} questions.
                <br />
                <span className="text-muted-foreground">
                  Are you sure you want to submit your quiz?
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Review Answers
          </Button>
          <Button 
            variant={hasUnanswered ? "hero" : "default"} 
            onClick={onConfirm}
            className="flex-1"
          >
            Submit Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
