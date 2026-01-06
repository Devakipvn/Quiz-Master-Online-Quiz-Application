import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  XCircle, 
  CheckCircle, 
  MinusCircle,
  Home,
  RotateCcw,
  Share2,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import ScoreCircle from '@/components/quiz/ScoreCircle';
import { useQuiz } from '@/contexts/QuizContext';
import Footer from '@/components/Footer';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizData, quizResult, isQuizCompleted, resetQuiz } = useQuiz();

  // Redirect if no results
  useEffect(() => {
    if (!isQuizCompleted || !quizResult) {
      navigate('/');
    }
  }, [isQuizCompleted, quizResult, navigate]);

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

  const stats = [
    {
      icon: CheckCircle,
      label: "Correct",
      value: quizResult.correctAnswers,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: XCircle,
      label: "Incorrect",
      value: quizResult.incorrectAnswers,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      icon: MinusCircle,
      label: "Unanswered",
      value: quizResult.unanswered,
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-accent/5 rounded-full blur-3xl" />
        {quizResult.passed && (
          <>
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent rounded-full animate-pulse" />
            <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-success rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>

      <main className="flex-1 relative p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Result Card */}
          <QuizCard className="text-center mb-6">
            {/* Trophy or Fail Icon */}
            <div className="relative mb-6">
              <div 
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto flex items-center justify-center ${
                  quizResult.passed ? 'bg-success/10' : 'bg-destructive/10'
                } animate-scale-in`}
              >
                {quizResult.passed ? (
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-success" />
                ) : (
                  <XCircle className="w-10 h-10 md:w-12 md:h-12 text-destructive" />
                )}
              </div>
              {quizResult.passed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 md:w-32 h-28 md:h-32 rounded-full border-4 border-success/30 animate-pulse-ring" />
                </div>
              )}
            </div>

            {/* Result Message */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
              {quizResult.passed ? 'Congratulations!' : 'Better Luck Next Time'}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.1s' }}>
              {quizResult.passed 
                ? "You've successfully passed the quiz!" 
                : "Don't give up! Practice makes perfect."}
            </p>

            {/* Score Circle */}
            <div className="flex justify-center mb-6 md:mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <ScoreCircle 
                percentage={quizResult.percentage} 
                passed={quizResult.passed} 
              />
            </div>

            {/* Pass/Fail Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-base md:text-lg font-semibold mb-6 md:mb-8 animate-fade-in ${
                quizResult.passed 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {quizResult.passed ? (
                <>
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                  PASSED
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 md:w-6 md:h-6" />
                  FAILED
                </>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`p-3 md:p-4 rounded-xl ${stat.bgColor} animate-slide-up`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color} mx-auto mb-1 md:mb-2`} />
                  <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Score Details */}
            <div className="p-3 md:p-4 rounded-xl bg-secondary/50 text-xs md:text-sm text-muted-foreground">
              You scored <span className="font-semibold text-foreground">{quizResult.correctAnswers}</span> out of{' '}
              <span className="font-semibold text-foreground">{quizResult.totalQuestions}</span> questions correctly.
              <br />
              Passing score: {quizData.passingScore}%
            </div>
          </QuizCard>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-4">
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
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/review')}
              className="gap-2"
            >
              <Eye className="w-5 h-5" />
              Review Answers
            </Button>
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleRetry}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retry Quiz
            </Button>
          </div>

          {/* Share Button */}
          <div className="text-center">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Share2 className="w-4 h-4" />
              Share Result
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;
