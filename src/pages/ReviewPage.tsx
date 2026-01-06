import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, MinusCircle, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { useQuiz } from '@/contexts/QuizContext';
import Footer from '@/components/Footer';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizData, quizResult, userAnswers, isQuizCompleted, resetQuiz } = useQuiz();

  useEffect(() => {
    if (!isQuizCompleted || !quizResult || !quizData) {
      navigate('/');
    }
  }, [isQuizCompleted, quizResult, quizData, navigate]);

  const handleRetry = () => {
    resetQuiz();
    navigate('/instructions');
  };

  const handleHome = () => {
    resetQuiz();
    navigate('/');
  };

  if (!quizResult || !quizData) {
    return null;
  }

  const getAnswerStatus = (questionId: number) => {
    const answer = userAnswers.find(a => a.questionId === questionId);
    if (!answer || answer.selectedOption === null) return 'unanswered';
    return answer.isCorrect ? 'correct' : 'incorrect';
  };

  const getSelectedAnswer = (questionId: number) => {
    const answer = userAnswers.find(a => a.questionId === questionId);
    return answer?.selectedOption ?? null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 relative">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Results</span>
            </Link>

            {/* Score Summary */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-success">
                <CheckCircle className="w-4 h-4" />
                <span>{quizResult.correctAnswers} Correct</span>
              </div>
              <div className="flex items-center gap-1.5 text-destructive">
                <XCircle className="w-4 h-4" />
                <span>{quizResult.incorrectAnswers} Wrong</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MinusCircle className="w-4 h-4" />
                <span>{quizResult.unanswered} Skipped</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Review Your Answers
            </h1>
            <p className="text-muted-foreground">
              See how you performed on each question
            </p>
          </div>

          {/* Questions List */}
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            {quizData.questions.map((question, index) => {
              const status = getAnswerStatus(question.id);
              const selectedAnswer = getSelectedAnswer(question.id);

              return (
                <QuizCard
                  key={question.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold ${
                        status === 'correct'
                          ? 'bg-success/10 text-success'
                          : status === 'incorrect'
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {status === 'correct' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                            <CheckCircle className="w-3 h-3" />
                            Correct
                          </span>
                        )}
                        {status === 'incorrect' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                            <XCircle className="w-3 h-3" />
                            Incorrect
                          </span>
                        )}
                        {status === 'unanswered' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            <MinusCircle className="w-3 h-3" />
                            Unanswered
                          </span>
                        )}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground break-words">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 md:space-y-3 pl-0 md:pl-12">
                    {question.options.map((option, optIndex) => {
                      const isCorrectOption = optIndex === question.correctAnswer;
                      const isSelectedOption = selectedAnswer === optIndex;
                      const isWrongSelection = isSelectedOption && !isCorrectOption;

                      let optionClass = 'bg-secondary/50 border-transparent';
                      if (isCorrectOption) {
                        optionClass = 'bg-success/10 border-success';
                      } else if (isWrongSelection) {
                        optionClass = 'bg-destructive/10 border-destructive';
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 transition-colors ${optionClass}`}
                        >
                          {/* Option Label */}
                          <span
                            className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                              isCorrectOption
                                ? 'bg-success text-success-foreground'
                                : isWrongSelection
                                ? 'bg-destructive text-destructive-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </span>

                          {/* Option Text */}
                          <span
                            className={`flex-1 text-sm md:text-base ${
                              isCorrectOption
                                ? 'text-success font-medium'
                                : isWrongSelection
                                ? 'text-destructive'
                                : 'text-foreground'
                            }`}
                          >
                            {option}
                          </span>

                          {/* Icons */}
                          {isCorrectOption && (
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          )}
                          {isWrongSelection && (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Your Answer Summary (for unanswered) */}
                  {status === 'unanswered' && (
                    <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                      You didn't answer this question. The correct answer was{' '}
                      <span className="font-medium text-success">
                        {String.fromCharCode(65 + question.correctAnswer)}: {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </QuizCard>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleHome}
                className="gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={handleRetry}
                className="gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewPage;
