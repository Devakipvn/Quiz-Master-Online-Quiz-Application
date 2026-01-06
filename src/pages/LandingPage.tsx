import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Trophy, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import Footer from '@/components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Engaging Questions",
      description: "Test your knowledge with carefully curated questions across various topics."
    },
    {
      icon: Clock,
      title: "Timed Challenges",
      description: "Race against the clock to answer questions and boost your score."
    },
    {
      icon: Trophy,
      title: "Instant Results",
      description: "Get immediate feedback and see how well you performed."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex-1">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-6 md:mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Challenge Your Mind</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 animate-slide-up">
              <span className="text-foreground">Master Any Topic with</span>
              <br />
              <span className="text-gradient">Interactive Quizzes</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
              Put your knowledge to the test with our engaging quiz platform. 
              Learn, compete, and track your progress across multiple categories.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/categories')}
                className="group w-full sm:w-auto"
              >
                Start Quiz
                <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Why Choose QuizMaster?</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-4">
              Our platform makes learning fun and interactive with features designed to help you succeed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <QuizCard 
                key={feature.title}
                className="text-center group"
              >
                <div 
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
                >
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </QuizCard>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto text-center">
              {[
                { value: "10K+", label: "Questions" },
                { value: "50+", label: "Categories" },
                { value: "100K+", label: "Quiz Takers" },
                { value: "4.9", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-primary-foreground">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80 text-xs sm:text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
