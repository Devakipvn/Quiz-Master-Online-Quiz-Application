import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';
import QuizCard from '@/components/quiz/QuizCard';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make learning accessible, engaging, and fun for everyone through interactive quizzes."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "Join thousands of learners who challenge themselves daily with our curated quizzes."
    },
    {
      icon: Award,
      title: "Quality Content",
      description: "Every question is carefully crafted by experts to ensure accuracy and educational value."
    },
    {
      icon: Heart,
      title: "Passion for Learning",
      description: "We believe that curiosity is the foundation of knowledge and growth."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center pb-8 md:pb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 md:mb-4">
              About QuizMaster
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
              Empowering minds through interactive learning experiences
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {/* Story Section */}
        <QuizCard className="mb-8 md:mb-12 max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4 text-muted-foreground text-sm md:text-base">
            <p>
              QuizMaster was born from a simple idea: learning should be fun. We noticed that traditional
              study methods often felt tedious and uninspiring, so we set out to create something different.
            </p>
            <p>
              Since our launch, we've helped thousands of users expand their knowledge across various
              subjects, from science and history to technology and entertainment. Our platform combines
              the thrill of competition with the satisfaction of learning.
            </p>
            <p>
              Today, QuizMaster continues to grow with new categories, questions, and features being
              added regularly. We're committed to making education accessible and enjoyable for everyone.
            </p>
          </div>
        </QuizCard>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <QuizCard 
              key={value.title}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{value.description}</p>
            </QuizCard>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
