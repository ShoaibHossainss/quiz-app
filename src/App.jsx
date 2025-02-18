import { useState } from "react";
import QuizHistory from "./QuizHistory";
import Quiz from "./Quiz";


function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-4xl text-center mb-10">
    Join BrainBusters and Take Your Trivia Skills to the Next Level!
    </h1>
    <div>
      {!quizStarted ? (
        <>
          <h1 className="text-2xl text-center font-bold mb-4">Interactive Quiz</h1>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-6 py-3 text-center items-center mx-auto flex mb-6 justify-center bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
          >
            Start Quiz
          </button>
          <QuizHistory />
        </>
      ) : (
        <Quiz onQuizEnd={() => setQuizStarted(false)} />
      )}
    </div>
  </div>
  )
}

export default App
