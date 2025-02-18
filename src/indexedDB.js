export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("QuizDB", 2);  // Increment version number
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains("quizResults")) {
            db.createObjectStore("quizResults", { keyPath: "id", autoIncrement: true });
          }
        };
    
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Failed to open IndexedDB.");
      });
    };
  
  export const saveQuizResult = async (score, totalQuestions) => {
    try {
      const db = await openDB();
      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");
    
      const result = { score, totalQuestions, date: new Date() };
    
      const request = store.add(result);
    
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Failed to save quiz result.");
    
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject("Failed to complete transaction.");
      });
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while saving the quiz result.");
    }
  };
  
  export const getQuizResults = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("quizResults", "readonly");
      const store = transaction.objectStore("quizResults");
    
      const request = store.getAll();
    
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Failed to fetch quiz results.");
    
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject("Failed to complete transaction.");
      });
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching quiz results.");
    }
  };
  
  export const deleteQuizHistory = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("quizResults", "readwrite");
      const store = transaction.objectStore("quizResults");
    
      store.clear();
    
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject("Failed to delete quiz history.");
      });
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while deleting quiz history.");
    }
  };
  