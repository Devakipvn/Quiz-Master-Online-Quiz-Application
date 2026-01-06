import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Mock quiz data - will be replaced with API calls
const mockQuizData = {
  title: "General Knowledge Quiz",
  description: "Test your knowledge across various topics",
  timePerQuestion: 30,
  totalQuestions: 5,
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What is the capital city of Japan?",
      options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: 1,
    },
  ],
};

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
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  quizResult: QuizResult | null;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  
  // Timer state
  timeRemaining: number;
  isTimerRunning: boolean;
  
  // Actions
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  // API placeholder - Load quiz data
  const loadQuiz = useCallback(async () => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quiz`);
    // const data = await response.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setQuizData(mockQuizData);
  }, []);

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
    currentQuestionIndex,
    userAnswers,
    quizResult,
    isQuizStarted,
    isQuizCompleted,
    timeRemaining,
    isTimerRunning,
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
