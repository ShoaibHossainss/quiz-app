export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("quizResults")) {
          db.createObjectStore("quizResults", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("IndexedDB failed to open.");
    });
  };
  
  export const saveQuizResult = async (score, totalQuestions) => {
    const db = await openDB();
    const transaction = db.transaction("quizResults", "readwrite");
    const store = transaction.objectStore("quizResults");
  
    store.add({ score, totalQuestions, date: new Date() });
  };
  
  export const getQuizResults = async () => {
    const db = await openDB();
    const transaction = db.transaction("quizResults", "readonly");
    const store = transaction.objectStore("quizResults");
  
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };
  
 
  export const deleteQuizHistory = async () => {
    const db = await openDB();
    const transaction = db.transaction("quizResults", "readwrite");
    const store = transaction.objectStore("quizResults");
  
    store.clear();
  };
  