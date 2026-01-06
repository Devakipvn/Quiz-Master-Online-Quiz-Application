import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/components/quiz/QuizCard';
import Footer from '@/components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, 
      participate in quizzes, or contact us for support. This may include your name, email address, 
      and quiz performance data.`
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect to provide, maintain, and improve our services, 
      personalize your experience, track your quiz progress, and communicate with you about 
      updates and new features.`
    },
    {
      title: "Information Sharing",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties 
      without your consent, except as necessary to provide our services or as required by law.`
    },
    {
      title: "Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal 
      information against unauthorized access, alteration, disclosure, or destruction.`
    },
    {
      title: "Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to enhance your experience, 
      analyze usage patterns, and deliver personalized content. You can control cookie preferences 
      through your browser settings.`
    },
    {
      title: "Your Rights",
      content: `You have the right to access, correct, or delete your personal information. 
      You may also request a copy of your data or ask us to restrict certain processing activities.`
    },
    {
      title: "Children's Privacy",
      content: `Our services are not intended for children under 13. We do not knowingly collect 
      personal information from children under 13 without parental consent.`
    },
    {
      title: "Changes to This Policy",
      content: `We may update this privacy policy from time to time. We will notify you of any 
      significant changes by posting the new policy on this page and updating the effective date.`
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
              Privacy Policy
            </h1>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <QuizCard className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
            At QuizMaster, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our quiz platform.
          </p>

          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Contact Us</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@quizmaster.com" className="text-primary hover:underline">
                privacy@quizmaster.com
              </a>
            </p>
          </div>
        </QuizCard>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
