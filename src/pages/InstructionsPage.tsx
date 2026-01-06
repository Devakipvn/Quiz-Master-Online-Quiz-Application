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
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Header Card */}
        <QuizCard className="mb-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-3">{quizData.title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{quizData.description}</p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{quizData.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{quizData.timePerQuestion}s</div>
              <div className="text-sm text-muted-foreground">Per Question</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{quizData.passingScore}%</div>
              <div className="text-sm text-muted-foreground">To Pass</div>
            </div>
          </div>
        </QuizCard>

        {/* Rules Card */}
        <QuizCard className="mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Quiz Rules
          </h2>
          
          <div className="grid gap-4">
            {rules.map((rule, index) => (
              <div 
                key={rule.title}
                className="flex gap-4 p-4 rounded-lg bg-secondary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <rule.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </QuizCard>

        {/* Start Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Button 
            variant="hero" 
            size="xl"
            onClick={handleStartQuiz}
            className="group"
          >
            Begin Quiz
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
