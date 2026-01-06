import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { quizCategories, getCategoryById, QuizCategory } from '@/data/quizCategories';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  title: string;
  description: string;
  timePerQuestion: number;
  totalQuestions: number;
  passingScore: number;
  questions: Question[];
}

interface UserAnswer {
  questionId: number;
  selectedOption: number | null;
  isCorrect: boolean;
  timeTaken: number;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number;
  percentage: number;
  passed: boolean;
  answers: UserAnswer[];
}

interface QuizContextType {
  // Quiz data
  quizData: QuizData | null;
  selectedCategory: QuizCategory | null;
  categories: QuizCategory[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  quizResult: QuizResult | null;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  
  // Timer state
  timeRemaining: number;
  isTimerRunning: boolean;
  
  // Actions
  selectCategory: (categoryId: string) => void;
  loadQuiz: () => Promise<void>;
  startQuiz: () => void;
  selectAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  setTimeRemaining: (time: number) => void;
  setIsTimerRunning: (running: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  // Select a category
  const selectCategory = useCallback((categoryId: string) => {
    const category = getCategoryById(categoryId);
    if (category) {
      setSelectedCategory(category);
      const quizDataFromCategory: QuizData = {
        title: category.name,
        description: category.description,
        timePerQuestion: category.timePerQuestion,
        totalQuestions: category.questions.length,
        passingScore: category.passingScore,
        questions: category.questions,
      };
      setQuizData(quizDataFromCategory);
    }
  }, []);

  // API placeholder - Load quiz data (for backward compatibility)
  const loadQuiz = useCallback(async () => {
    // If no category selected, use the first one
    if (!selectedCategory && quizCategories.length > 0) {
      selectCategory(quizCategories[0].id);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }, [selectedCategory, selectCategory]);

  // Start the quiz
  const startQuiz = useCallback(() => {
    if (!quizData) return;
    
    setIsQuizStarted(true);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setTimeRemaining(quizData.timePerQuestion);
    setIsTimerRunning(true);
    setQuestionStartTime(Date.now());
  }, [quizData]);

  // Select an answer for the current question
  const selectAnswer = useCallback((optionIndex: number) => {
    if (!quizData || isQuizCompleted) return;
    
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect: optionIndex === currentQuestion.correctAnswer,
      timeTaken,
    };

    setUserAnswers(prev => {
      const newAnswers = [...prev];
      const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers.push(answer);
      }
      
      return newAnswers;
    });
    
    setIsTimerRunning(false);
  }, [quizData, currentQuestionIndex, isQuizCompleted, questionStartTime]);

  // Move to the next question
  const nextQuestion = useCallback(() => {
    if (!quizData) return;
    
    // If no answer was selected, record as unanswered
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const hasAnswer = userAnswers.some(a => a.questionId === currentQuestion.id);
    
    if (!hasAnswer) {
      const timeTaken = quizData.timePerQuestion;
      const answer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedOption: null,
        isCorrect: false,
        timeTaken,
      };
      setUserAnswers(prev => [...prev, answer]);
    }
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(quizData.timePerQuestion);
      setIsTimerRunning(true);
      setQuestionStartTime(Date.now());
    }
  }, [quizData, currentQuestionIndex, userAnswers]);

  // Submit the quiz and calculate results
  const submitQuiz = useCallback(() => {
    if (!quizData) return;
    
    // Ensure all questions have an answer entry
    const finalAnswers = [...userAnswers];
    quizData.questions.forEach(question => {
      const hasAnswer = finalAnswers.some(a => a.questionId === question.id);
      if (!hasAnswer) {
        finalAnswers.push({
          questionId: question.id,
          selectedOption: null,
          isCorrect: false,
          timeTaken: quizData.timePerQuestion,
        });
      }
    });
    
    const correctAnswers = finalAnswers.filter(a => a.isCorrect).length;
    const incorrectAnswers = finalAnswers.filter(a => a.selectedOption !== null && !a.isCorrect).length;
    const unanswered = finalAnswers.filter(a => a.selectedOption === null).length;
    const percentage = Math.round((correctAnswers / quizData.totalQuestions) * 100);
    
    const result: QuizResult = {
      totalQuestions: quizData.totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      score: correctAnswers,
      percentage,
      passed: percentage >= quizData.passingScore,
      answers: finalAnswers,
    };
    
    setQuizResult(result);
    setIsQuizCompleted(true);
    setIsTimerRunning(false);
    setUserAnswers(finalAnswers);
  }, [quizData, userAnswers]);

  // Reset the quiz
  const resetQuiz = useCallback(() => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setTimeRemaining(0);
    setIsTimerRunning(false);
  }, []);

  const value: QuizContextType = {
    quizData,
    selectedCategory,
    categories: quizCategories,
    currentQuestionIndex,
    userAnswers,
    quizResult,
    isQuizStarted,
    isQuizCompleted,
    timeRemaining,
    isTimerRunning,
    selectCategory,
    loadQuiz,
    startQuiz,
    selectAnswer,
    nextQuestion,
    submitQuiz,
    resetQuiz,
    setTimeRemaining,
    setIsTimerRunning,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
