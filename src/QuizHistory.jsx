import { useState, useEffect } from "react";
import { getQuizResults, deleteQuizHistory } from "./indexedDB";

const QuizHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
      }, []);

      const loadHistory = async () => {
        const results = await getQuizResults();
        setHistory(results);
      };

      const handleDeleteHistory = async () => {
        await deleteQuizHistory();
        setHistory([]); 
        alert("Quiz history deleted successfully!");
      };
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quiz History</h2>

      {history.length > 0 ? (
        <>
          <ul className="mb-4">
            {history.map((entry, index) => (
              <li key={index} className="p-2 border-b">
                Score: {entry.score}/{entry.totalQuestions} on {new Date(entry.date).toLocaleString()}
              </li>
            ))}
          </ul>
          <button
            onClick={handleDeleteHistory}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete History
          </button>
        </>
      ) : (
        <p>No quiz history available.</p>
      )}
    </div>
    );
};

export default QuizHistory;