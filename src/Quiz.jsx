
import { useEffect } from "react";
import { saveQuizResult } from "./indexedDB";
import { useState } from "react";

const questions = [
    // Multiple-Choice Questions
    { 
      question: "Which planet is closest to the Sun?", 
      options: ["Venus", "Mercury", "Earth", "Mars"], 
      answer: "Mercury" 
    },
    { 
      question: "Which data structure follows FIFO?", 
      options: ["Stack", "Queue", "Tree", "Graph"], 
      answer: "Queue" 
    },
    { 
      question: "Which language is used to structure web pages?", 
      options: ["Python", "Java", "HTML", "C++"], 
      answer: "HTML" 
    },
    { 
      question: "Which chemical symbol stands for Gold?", 
      options: ["Au", "Gd", "Ag", "Pt"], 
      answer: "Au" 
    },
    { 
      question: "Which of these processes is not typically involved in refining petroleum?", 
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], 
      answer: "Filtration" 
    },
  
    // Integer-Type Questions
    { 
      question: "What is the value of 12 + 28?", 
      answer: "40", 
      type: "integer" 
    },
    { 
      question: "How many states are there in the United States?", 
      answer: "50", 
      type: "integer" 
    },
    { 
      question: "In which year was the Declaration of Independence signed?", 
      answer: "1776", 
      type: "integer" 
    },
    { 
      question: "What is the value of pi rounded to the nearest integer?", 
      answer: "3", 
      type: "integer" 
    },
    { 
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", 
      answer: "120", 
      type: "integer" 
    }
  ];
  
const Quiz = ({ onQuizEnd }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        nextQuestion();
      }
    }, [timeLeft]);
  
    const handleAnswer = (answer) => {
      if (!answer) return; // Prevent empty answers
      setSelectedAnswer(answer);
      
      if (answer.toString().toLowerCase() === questions[currentQuestion].answer.toString().toLowerCase()) {
        setScore((prevScore) => prevScore + 1);
      }
  
      setTimeout(() => nextQuestion(), 1000);
    };
  
    const nextQuestion = () => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
        setTimeLeft(30);
      } else {
        saveQuizResult(score, questions.length);
        alert(`Quiz completed! Your score: ${score}/${questions.length}`);
        onQuizEnd();
      }
    };
  
    const currentQ = questions[currentQuestion];
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">{currentQ.question}</h2>
      <div className="mb-4 text-gray-600">Time Left: {timeLeft}s</div>
      {currentQ.options && currentQ.options.length > 0 ? (
        currentQ.options.map((option) => (
          <button
            key={option}
            className={`block w-full p-2 my-2 border rounded-lg ${
              selectedAnswer === option
                ? option === currentQ.answer
                  ? "bg-green-300"
                  : "bg-red-300"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))
      ) : (
        <>
    <input
    type="number"
    className="block w-full p-2 border rounded-lg bg-gray-100"
    value={selectedAnswer}
    onChange={(e) => setSelectedAnswer(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleAnswer(selectedAnswer)} // Replaced onKeyPress with onKeyDown
    placeholder="Enter your answer"
    />
    <button
    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
    onClick={() => handleAnswer(selectedAnswer)}
    >
    Submit Answer
    </button>
        </>
      )}
    </div>
    );
};

export default Quiz;