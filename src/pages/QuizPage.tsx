import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import Timer from '@/components/quiz/Timer';
import ProgressBar from '@/components/quiz/ProgressBar';
import OptionCard from '@/components/quiz/OptionCard';
import ConfirmModal from '@/components/quiz/ConfirmModal';
import { useQuiz } from '@/contexts/QuizContext';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    quizData,
    currentQuestionIndex,
    userAnswers,
    isQuizStarted,
    selectAnswer,
    nextQuestion,
    submitQuiz,
    setIsTimerRunning,
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Redirect if quiz hasn't started
  useEffect(() => {
    if (!isQuizStarted || !quizData) {
      navigate('/instructions');
    }
  }, [isQuizStarted, quizData, navigate]);

  // Reset state when question changes
  useEffect(() => {
    const currentQuestion = quizData?.questions[currentQuestionIndex];
    const existingAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);
    
    if (existingAnswer) {
      setSelectedOption(existingAnswer.selectedOption);
      setHasAnswered(true);
    } else {
      setSelectedOption(null);
      setHasAnswered(false);
    }
  }, [currentQuestionIndex, quizData, userAnswers]);

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedOption(optionIndex);
    setHasAnswered(true);
    selectAnswer(optionIndex);
  };

  const handleTimeUp = useCallback(() => {
    if (!hasAnswered) {
      setHasAnswered(true);
    }
  }, [hasAnswered]);

  const handleNext = () => {
    if (!quizData) return;
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      nextQuestion();
    } else {
      // Last question - show confirm modal
      handleSubmitClick();
    }
  };

  const handleSubmitClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false);
    submitQuiz();
    navigate('/results');
  };

  if (!quizData) {
    return null;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;
  const unansweredCount = quizData.questions.length - userAnswers.filter(a => a.selectedOption !== null).length - (selectedOption !== null ? 1 : 0);

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-56 md:w-72 h-56 md:h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-base sm:text-lg md:text-xl font-bold truncate mr-2">{quizData.title}</h1>
          <Timer onTimeUp={handleTimeUp} />
        </div>

        {/* Progress */}
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={quizData.totalQuestions} 
          className="mb-4 md:mb-8"
        />

        {/* Question Card */}
        <QuizCard key={currentQuestion.id} className="mb-4 md:mb-6">
          {/* Question Number Badge */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
            Question {currentQuestionIndex + 1}
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 md:mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-2 md:space-y-3">
            {currentQuestion.options.map((option, index) => (
              <OptionCard
                key={index}
                label={optionLabels[index]}
                option={option}
                isSelected={selectedOption === index}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(index)}
              />
            ))}
          </div>
        </QuizCard>

        {/* Timer expired warning */}
        {hasAnswered && selectedOption === null && (
          <div className="flex items-center gap-2 p-3 md:p-4 rounded-lg bg-destructive/10 text-destructive mb-4 md:mb-6 animate-fade-in">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <p className="text-xs md:text-sm font-medium">Time's up! This question will be marked as unanswered.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sm:justify-between sm:items-center">
          <div className="text-xs md:text-sm text-muted-foreground text-center sm:text-left order-2 sm:order-1">
            {userAnswers.length} of {quizData.totalQuestions} answered
          </div>
          
          <div className="flex gap-2 md:gap-3 order-1 sm:order-2">
            {isLastQuestion ? (
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleSubmitClick}
                className="group flex-1 sm:flex-none"
              >
                Submit Quiz
                <Send className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="lg"
                onClick={handleNext}
                className="group flex-1 sm:flex-none"
              >
                Next Question
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        unansweredCount={unansweredCount}
        totalQuestions={quizData.totalQuestions}
      />
    </div>
  );
};

export default QuizPage;
