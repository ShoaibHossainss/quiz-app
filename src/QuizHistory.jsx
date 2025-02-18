import { useState, useEffect } from "react";
import { getQuizResults, deleteQuizHistory } from "./indexedDB";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const results = await getQuizResults();
     
      setHistory(results || []);
    } catch (err) {
      setError("Failed to load quiz history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteHistory = async () => {
    try {
      await deleteQuizHistory();
      setHistory([]);
      alert("Quiz history deleted successfully!");
    } catch (err) {
      alert("Failed to delete quiz history");
    }
  };

  if (loading) {
    return <div>Loading quiz history...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quiz History</h2>

      {error && <p className="text-red-500">{error}</p>}

      {history.length > 0 ? (
        <>
          <ul className="mb-4">
            {history.map((entry, index) => (
              <li key={index} className="p-2 border-b">
                Score: {entry.score}/{entry.totalQuestions} on{" "}
                {new Date(entry.date).toLocaleString()}
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
