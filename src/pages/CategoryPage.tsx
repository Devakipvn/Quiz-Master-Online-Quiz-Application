import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { quizCategories } from '@/data/quizCategories';
import { useQuiz } from '@/contexts/QuizContext';
import { ArrowLeft, Clock, HelpCircle, Target, Atom, BookOpen, Globe, Cpu, Trophy, Film } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Trophy: <Trophy className="w-8 h-8" />,
  Film: <Film className="w-8 h-8" />,
};

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectCategory } = useQuiz();

  const handleSelectCategory = (categoryId: string) => {
    selectCategory(categoryId);
    navigate('/instructions');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Choose a Category
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a topic to start your quiz adventure
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category, index) => (
            <QuizCard
              key={category.id}
              className="group cursor-pointer hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSelectCategory(category.id)}
            >
              {/* Category Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {iconMap[category.icon]}
              </div>

              {/* Category Info */}
              <h2 className="text-xl font-bold text-foreground mb-2">
                {category.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {category.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HelpCircle className="w-4 h-4" />
                  <span>{category.questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{category.timePerQuestion}s / question</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>{category.passingScore}% to pass</span>
                </div>
              </div>

              {/* Start Button */}
              <Button
                variant="outline"
                className="w-full mt-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Start Quiz
              </Button>
            </QuizCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
