import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QuizCard from '@/components/quiz/QuizCard';
import Footer from '@/components/Footer';

const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing or using QuizMaster, you agree to be bound by these Terms of Service 
      and all applicable laws and regulations. If you do not agree with any of these terms, 
      you are prohibited from using or accessing this service.`
    },
    {
      title: "Use License",
      content: `Permission is granted to temporarily access and use QuizMaster for personal, 
      non-commercial purposes. This license does not include the right to modify, copy, 
      distribute, or create derivative works from our content without explicit permission.`
    },
    {
      title: "User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account credentials 
      and for all activities that occur under your account. You must notify us immediately of 
      any unauthorized use of your account.`
    },
    {
      title: "User Conduct",
      content: `You agree not to use the service to: violate any laws, infringe on intellectual 
      property rights, transmit harmful content, attempt to gain unauthorized access to our 
      systems, or interfere with other users' enjoyment of the service.`
    },
    {
      title: "Quiz Content",
      content: `All quiz content, including questions, answers, and explanations, is the property 
      of QuizMaster or its content providers. You may not reproduce, distribute, or create 
      derivative works from this content without authorization.`
    },
    {
      title: "Disclaimer",
      content: `QuizMaster is provided "as is" without warranties of any kind. We do not guarantee 
      the accuracy of quiz content or that the service will be uninterrupted or error-free. 
      Use of the service is at your own risk.`
    },
    {
      title: "Limitation of Liability",
      content: `In no event shall QuizMaster be liable for any indirect, incidental, special, 
      consequential, or punitive damages arising from your use of the service, including 
      but not limited to loss of data or profits.`
    },
    {
      title: "Termination",
      content: `We reserve the right to terminate or suspend your account and access to the service 
      at our sole discretion, without notice, for conduct that we believe violates these Terms 
      or is harmful to other users or the service.`
    },
    {
      title: "Modifications",
      content: `We reserve the right to modify these terms at any time. Changes will be effective 
      immediately upon posting. Your continued use of the service after changes constitutes 
      acceptance of the modified terms.`
    },
    {
      title: "Governing Law",
      content: `These terms shall be governed by and construed in accordance with applicable laws, 
      without regard to conflict of law principles. Any disputes shall be resolved in the 
      appropriate courts of jurisdiction.`
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
              Terms of Service
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
            Welcome to QuizMaster. Please read these Terms of Service carefully before using our platform.
            By using QuizMaster, you agree to these terms.
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
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Questions?</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@quizmaster.com" className="text-primary hover:underline">
                legal@quizmaster.com
              </a>
            </p>
          </div>
        </QuizCard>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
