// Quiz categories with 10+ questions each

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  timePerQuestion: number;
  passingScore: number;
  questions: Question[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: "science",
    name: "Science",
    description: "Test your knowledge of physics, chemistry, and biology",
    icon: "Atom",
    color: "from-blue-500 to-cyan-500",
    timePerQuestion: 30,
    passingScore: 60,
    questions: [
      { id: 1, question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: 0 },
      { id: 2, question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1 },
      { id: 3, question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctAnswer: 0 },
      { id: 4, question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Brain"], correctAnswer: 2 },
      { id: 5, question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2 },
      { id: 6, question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correctAnswer: 1 },
      { id: 7, question: "Which scientist developed the theory of relativity?", options: ["Newton", "Einstein", "Hawking", "Galileo"], correctAnswer: 1 },
      { id: 8, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], correctAnswer: 2 },
      { id: 9, question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correctAnswer: 2 },
      { id: 10, question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correctAnswer: 2 },
    ],
  },
  {
    id: "history",
    name: "History",
    description: "Explore events and figures that shaped our world",
    icon: "BookOpen",
    color: "from-amber-500 to-orange-500",
    timePerQuestion: 30,
    passingScore: 60,
    questions: [
      { id: 1, question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2 },
      { id: 2, question: "Who was the first President of the United States?", options: ["Jefferson", "Washington", "Lincoln", "Adams"], correctAnswer: 1 },
      { id: 3, question: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Mayans"], correctAnswer: 2 },
      { id: 4, question: "When did the French Revolution begin?", options: ["1776", "1789", "1799", "1815"], correctAnswer: 1 },
      { id: 5, question: "Who discovered America in 1492?", options: ["Magellan", "Columbus", "Vespucci", "Cabot"], correctAnswer: 1 },
      { id: 6, question: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Persian", "Roman", "Ottoman"], correctAnswer: 2 },
      { id: 7, question: "When was the Declaration of Independence signed?", options: ["1774", "1775", "1776", "1777"], correctAnswer: 2 },
      { id: 8, question: "Who was known as the Iron Lady?", options: ["Queen Victoria", "Margaret Thatcher", "Indira Gandhi", "Angela Merkel"], correctAnswer: 1 },
      { id: 9, question: "Which war was fought between the North and South in the US?", options: ["World War I", "Revolutionary War", "Civil War", "War of 1812"], correctAnswer: 2 },
      { id: 10, question: "Who wrote the Communist Manifesto?", options: ["Lenin", "Stalin", "Marx", "Engels"], correctAnswer: 2 },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    description: "Navigate through countries, capitals, and landmarks",
    icon: "Globe",
    color: "from-green-500 to-emerald-500",
    timePerQuestion: 25,
    passingScore: 60,
    questions: [
      { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2 },
      { id: 2, question: "Which is the largest continent?", options: ["Africa", "Europe", "Asia", "North America"], correctAnswer: 2 },
      { id: 3, question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: 1 },
      { id: 4, question: "Which country has the largest population?", options: ["USA", "India", "China", "Indonesia"], correctAnswer: 2 },
      { id: 5, question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correctAnswer: 1 },
      { id: 6, question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3 },
      { id: 7, question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correctAnswer: 2 },
      { id: 8, question: "Which desert is the largest in the world?", options: ["Gobi", "Sahara", "Arabian", "Kalahari"], correctAnswer: 1 },
      { id: 9, question: "What mountain is the tallest in the world?", options: ["K2", "Kangchenjunga", "Everest", "Lhotse"], correctAnswer: 2 },
      { id: 10, question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Korea", "Japan", "Thailand"], correctAnswer: 2 },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    description: "Challenge yourself with tech and computing questions",
    icon: "Cpu",
    color: "from-purple-500 to-violet-500",
    timePerQuestion: 30,
    passingScore: 60,
    questions: [
      { id: 1, question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"], correctAnswer: 1 },
      { id: 2, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], correctAnswer: 0 },
      { id: 3, question: "Which programming language is known for web development?", options: ["Python", "Java", "JavaScript", "C++"], correctAnswer: 2 },
      { id: 4, question: "What year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], correctAnswer: 2 },
      { id: 5, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
      { id: 6, question: "Who is the CEO of Tesla?", options: ["Jeff Bezos", "Tim Cook", "Elon Musk", "Sundar Pichai"], correctAnswer: 2 },
      { id: 7, question: "What is the most popular search engine?", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], correctAnswer: 2 },
      { id: 8, question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Rapid Access Memory"], correctAnswer: 0 },
      { id: 9, question: "Which company created the Android operating system?", options: ["Apple", "Microsoft", "Google", "Samsung"], correctAnswer: 2 },
      { id: 10, question: "What is the main function of a firewall?", options: ["Speed up internet", "Block unauthorized access", "Store data", "Cool the computer"], correctAnswer: 1 },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    description: "Test your knowledge of sports and athletics",
    icon: "Trophy",
    color: "from-red-500 to-rose-500",
    timePerQuestion: 25,
    passingScore: 60,
    questions: [
      { id: 1, question: "How many players are on a soccer team?", options: ["9", "10", "11", "12"], correctAnswer: 2 },
      { id: 2, question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "UK", "Brazil", "Japan"], correctAnswer: 2 },
      { id: 3, question: "In tennis, what is a score of zero called?", options: ["Nil", "Zero", "Love", "Nothing"], correctAnswer: 2 },
      { id: 4, question: "Which sport is known as 'the gentleman's game'?", options: ["Golf", "Cricket", "Tennis", "Polo"], correctAnswer: 1 },
      { id: 5, question: "How many rings are on the Olympic flag?", options: ["4", "5", "6", "7"], correctAnswer: 1 },
      { id: 6, question: "Which country won the 2018 FIFA World Cup?", options: ["Germany", "Brazil", "France", "Argentina"], correctAnswer: 2 },
      { id: 7, question: "What is the national sport of Japan?", options: ["Judo", "Karate", "Sumo", "Baseball"], correctAnswer: 2 },
      { id: 8, question: "How many points is a touchdown worth in American football?", options: ["3", "5", "6", "7"], correctAnswer: 2 },
      { id: 9, question: "Which basketball player is known as 'His Airness'?", options: ["Kobe Bryant", "LeBron James", "Michael Jordan", "Magic Johnson"], correctAnswer: 2 },
      { id: 10, question: "What is the diameter of a basketball hoop in inches?", options: ["16", "18", "20", "22"], correctAnswer: 1 },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, music, and pop culture trivia",
    icon: "Film",
    color: "from-pink-500 to-fuchsia-500",
    timePerQuestion: 25,
    passingScore: 60,
    questions: [
      { id: 1, question: "Who played Jack in Titanic?", options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Hanks", "Johnny Depp"], correctAnswer: 1 },
      { id: 2, question: "Which band sang 'Bohemian Rhapsody'?", options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"], correctAnswer: 2 },
      { id: 3, question: "What is the highest-grossing film of all time?", options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"], correctAnswer: 1 },
      { id: 4, question: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"], correctAnswer: 1 },
      { id: 5, question: "Which TV show features dragons and the Iron Throne?", options: ["The Witcher", "Game of Thrones", "Lord of the Rings", "Vikings"], correctAnswer: 1 },
      { id: 6, question: "What year was Netflix founded?", options: ["1995", "1997", "1999", "2001"], correctAnswer: 1 },
      { id: 7, question: "Who directed Jurassic Park?", options: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"], correctAnswer: 1 },
      { id: 8, question: "Which superhero is known as the 'Dark Knight'?", options: ["Superman", "Spider-Man", "Batman", "Iron Man"], correctAnswer: 2 },
      { id: 9, question: "What is the name of Harry Potter's owl?", options: ["Errol", "Hedwig", "Scabbers", "Crookshanks"], correctAnswer: 1 },
      { id: 10, question: "Which artist released the album 'Thriller'?", options: ["Prince", "Madonna", "Michael Jackson", "Whitney Houston"], correctAnswer: 2 },
    ],
  },
];

export const getCategoryById = (id: string): QuizCategory | undefined => {
  return quizCategories.find(cat => cat.id === id);
};
