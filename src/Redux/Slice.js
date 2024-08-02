import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    userName: '',
    currentQuestion: 0,
    score: 0,
    answers: [], 
    questions: [
     
      {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "answer": "Paris"
      },
      {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "answer": "Mars"
      },
      {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["Mark Twain", "Charles Dickens", "William Shakespeare", "Jane Austen"],
        "answer": "William Shakespeare"
      },
      {
        "question": "What is the smallest prime number?",
        "options": ["0", "1", "2", "3"],
        "answer": "2"
      },
      {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "answer": "Pacific Ocean"
      },
      {
        "question": "What is the chemical symbol for gold?",
        "options": ["Au", "Ag", "Pb", "Fe"],
        "answer": "Au"
      },
      {
        "question": "Who painted the Mona Lisa?",
        "options": ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
        "answer": "Leonardo da Vinci"
      },
      {
        "question": "What is the longest river in the world?",
        "options": ["Nile", "Amazon", "Yangtze", "Mississippi"],
        "answer": "Nile"
      },
      {
        "question": "Which element has the atomic number 1?",
        "options": ["Hydrogen", "Helium", "Lithium", "Beryllium"],
        "answer": "Hydrogen"
      },
      {
        "question": "What year did the Titanic sink?",
        "options": ["1912", "1905", "1915", "1920"],
        "answer": "1912"
      }
      // Add more questions here
    ],
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    submitAnswer: (state, action) => {
      const { answer } = action.payload;
      if (state.questions[state.currentQuestion].answer === answer) {
        state.score += 1;
      }
      state.answers.push(answer);
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.answers = [];
    },
  },
});

export const { setUserName, nextQuestion, submitAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
