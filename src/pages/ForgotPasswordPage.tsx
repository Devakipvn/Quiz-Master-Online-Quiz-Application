import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import QuizCard from '@/components/quiz/QuizCard';
import { Mail, ArrowLeft, KeyRound, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    toast({
      title: "Email Sent!",
      description: "Check your inbox for password reset instructions.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <QuizCard className="animate-fade-in text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/10 mb-4 md:mb-6">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-success" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">Check Your Email</h1>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
            </p>
            <div className="space-y-3">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Didn't receive email? Try again
              </Button>
            </div>
          </QuizCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 md:mb-6 transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <QuizCard className="animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-4">
              <KeyRound className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className={`pl-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <span>Send Reset Link</span>
              )}
            </Button>
          </form>

          {/* Back to Login Link */}
          <p className="text-center text-muted-foreground mt-6 text-sm md:text-base">
            Remember your password?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </QuizCard>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
