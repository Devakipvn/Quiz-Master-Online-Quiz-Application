import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { quizCategories } from '@/data/quizCategories';
import { useQuiz } from '@/contexts/QuizContext';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, HelpCircle, Target, Atom, BookOpen, Globe, Cpu, Trophy, Film } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-6 h-6 md:w-8 md:h-8" />,
  BookOpen: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
  Globe: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
  Cpu: <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
  Trophy: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
  Film: <Film className="w-6 h-6 md:w-8 md:h-8" />,
};

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectCategory } = useQuiz();

  const handleSelectCategory = (categoryId: string) => {
    selectCategory(categoryId);
    navigate('/instructions');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero gradient background */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Back</span>
            </Link>
          </div>

          {/* Title */}
          <div className="text-center pb-6 sm:pb-8 md:pb-12">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-foreground mb-1.5 sm:mb-2 md:mb-3">
              Choose a Category
            </h1>
            <p className="text-primary-foreground/80 text-xs sm:text-sm md:text-lg px-2">
              Select a topic to start your quiz adventure
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <main className="flex-1 container mx-auto px-3 sm:px-4 -mt-4 sm:-mt-6 md:-mt-8 pb-6 sm:pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {quizCategories.map((category, index) => (
            <QuizCard
              key={category.id}
              className="group cursor-pointer hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSelectCategory(category.id)}
            >
              {/* Category Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${category.color} text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                {iconMap[category.icon]}
              </div>

              {/* Category Info */}
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">
                {category.name}
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                {category.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground">
                  <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{category.questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{category.timePerQuestion}s</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground">
                  <Target className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{category.passingScore}%</span>
                </div>
              </div>

              {/* Start Button */}
              <Button
                variant="outline"
                className="w-full mt-4 md:mt-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm md:text-base"
              >
                Start Quiz
              </Button>
            </QuizCard>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
