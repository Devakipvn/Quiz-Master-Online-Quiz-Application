import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Categories', href: '/categories' },
      { label: 'How It Works', href: '/about' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:support@quizmaster.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <span className="text-lg md:text-xl font-bold text-foreground">QuizMaster</span>
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-5 max-w-xs">
              Challenge your mind with engaging quizzes across multiple categories. Learn, compete, and track your progress.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 md:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Product</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm md:text-base">Legal</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} QuizMaster. All rights reserved.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Made with ❤️ for curious minds
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
