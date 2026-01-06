import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Trophy, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Challenge Your Mind</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-slide-up">
              <span className="text-foreground">Master Any Topic with</span>
              <br />
              <span className="text-gradient">Interactive Quizzes</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Put your knowledge to the test with our engaging quiz platform. 
              Learn, compete, and track your progress across multiple categories.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/categories')}
                className="group"
              >
                Start Quiz
                <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose QuizMaster?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our platform makes learning fun and interactive with features designed to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <QuizCard 
              key={feature.title}
              className="text-center group"
            >
              <div 
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110"
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </QuizCard>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { value: "10K+", label: "Questions" },
              { value: "50+", label: "Categories" },
              { value: "100K+", label: "Quiz Takers" },
              { value: "4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-primary-foreground">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 QuizMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
