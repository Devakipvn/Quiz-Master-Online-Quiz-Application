import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { useQuiz } from '@/contexts/QuizContext';
import Footer from '@/components/Footer';

const InstructionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizData, loadQuiz, startQuiz } = useQuiz();

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleStartQuiz = () => {
    startQuiz();
    navigate('/quiz');
  };

  const rules = [
    {
      icon: HelpCircle,
      title: "Question Format",
      description: "Each question has 4 multiple-choice options. Select the best answer."
    },
    {
      icon: Clock,
      title: "Time Limit",
      description: `You have ${quizData?.timePerQuestion || 30} seconds to answer each question.`
    },
    {
      icon: AlertTriangle,
      title: "No Going Back",
      description: "Once you move to the next question, you cannot return to previous ones."
    },
    {
      icon: CheckCircle,
      title: "Scoring",
      description: `You need ${quizData?.passingScore || 60}% or higher to pass the quiz.`
    }
  ];

  if (!quizData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm md:text-base">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-56 md:w-80 h-56 md:h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 relative p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 md:mb-6 transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Header Card */}
          <QuizCard className="mb-4 md:mb-6 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-4 md:mb-6">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">{quizData.title}</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">{quizData.description}</p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{quizData.totalQuestions}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{quizData.timePerQuestion}s</div>
                <div className="text-xs md:text-sm text-muted-foreground">Per Question</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{quizData.passingScore}%</div>
                <div className="text-xs md:text-sm text-muted-foreground">To Pass</div>
              </div>
            </div>
          </QuizCard>

          {/* Rules Card */}
          <QuizCard className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              Quiz Rules
            </h2>
            
            <div className="grid gap-3 md:gap-4">
              {rules.map((rule, index) => (
                <div 
                  key={rule.title}
                  className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-secondary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <rule.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-0.5 md:mb-1">{rule.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </QuizCard>

          {/* Start Button */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
            <Button 
              variant="hero" 
              size="xl"
              onClick={handleStartQuiz}
              className="group w-full sm:w-auto"
            >
              Begin Quiz
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstructionsPage;
