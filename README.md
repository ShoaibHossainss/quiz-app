BrainBusters Quiz Website
## Overview
BrainBusters is a web-based quiz application designed to provide an engaging and interactive quiz experience. The app supports multiple-choice questions and integer-type questions, allowing users to test their knowledge across a variety of topics. The quiz application tracks the user's score, provides a countdown timer for each question, and saves the results for future reference.

## Live Link
You can check out the live version of the quiz website here:
[Visit BrainBusters Website](https://brainbustersbd.netlify.app)

## Features
- Multiple Question Types: The app supports multiple-choice and integer-based questions.
- Timer: A countdown timer of 30 seconds for each question, helping to enhance time-management skills.
- Score Tracking: Users’ correct answers are tracked, and their score is displayed after completing the quiz.
- Responsive Design: The application is designed to be responsive, providing an optimal experience across desktop and mobile devices.
- Results Storage: Users' quiz results are saved locally in the browser via IndexedDB to persist the data even after page reloads or browser restarts.
- Quiz Completion Alert: Once the user completes all questions, they receive an alert with their score out of the total number of questions.

## Tech Stack
- React: A JavaScript library used to build the user interface.
- Tailwind CSS: A utility-first CSS framework for fast styling.
- IndexedDB: For storing quiz results locally in the browser.
- React State Hooks: Managing the current question, score, timer, and selected answer using React hooks like useState and useEffect.
How It Works
- Questions: The app fetches a set of quiz questions from a predefined list. Each question can be either a multiple-choice question or an integer-based question.
- Timer: Each question has a 30-second timer. If the user doesn't select an answer in time, the question automatically moves to the next one.
- Answer Submission: Users can select their answer for multiple-choice questions or type in their answer for integer-based questions. The app checks the answer against the correct one and updates the score accordingly.
- Quiz Completion: When all questions are answered, the user's score is displayed, and the results are saved in IndexedDB. The user also receives an alert with their score.