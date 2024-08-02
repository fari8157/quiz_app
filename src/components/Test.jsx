import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, submitAnswer } from '../Redux/Slice';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestion } = useSelector((state) => state.quiz);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswerSubmission();
      return;
    }

    // Set up a timer to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts or when timeLeft changes
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSubmission = () => {
    if (selectedAnswer) {
      dispatch(submitAnswer({ answer: selectedAnswer }));
      setIsAnswered(true);
      setCorrectAnswer(questions[currentQuestion].answer);
      setTimeout(() => {
        dispatch(nextQuestion());
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(5); // Reset timer for the next question
        if (currentQuestion >= questions.length - 1) {
          navigate('/score');
        }
      }, 5000); // Wait for 5 seconds before moving to the next question
    }
  };

  const handleAnswerClick = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
      handleAnswerSubmission();
    }
  };

  const question = questions[currentQuestion];

  // Calculate the percentage of time remaining out of the initial 5 seconds
  const progress = (timeLeft / 5) * 100;
  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle

  // Determine border color based on the time left
  let borderColor;
  if (timeLeft > 3) {
    borderColor = "#Ad44c7"; // Initial color
  } else if (timeLeft > 1) {
    borderColor = "#F9C74F"; // Warning color
  } else {
    borderColor = "#F94144"; // End color
  }

  return (
    <div className="overflow-hidden">
      <div className="bg-[#Ad44c7] p-4 relative overflow-hidden">
        <div className="bg-[#A42FC1] md:h-[75vh] h-[45vh] md:rounded-b-[90px] rounded-b-[60px] rounded-3xl z-40 relative">
          <div className="bg-[#Ad44c7] md:h-56 md:w-56 h-32 w-32 rounded-full absolute left-[30%] md:top-[-70px] top-[-35px]"></div>
          <div className="bg-[#Ad44c7] md:h-32 md:w-32 h-20 w-20 rounded-full absolute top-[60px] md:right-[35%] right-[10%]"></div>
          <div className="bg-[#Ad44c7] md:h-46 md:w-46 h-32 w-32 rounded-full absolute md:top-[30vh] top-[15vh] md:left-[-50px] left-[-35px]"></div>
          <div className="bg-[#Ad44c7] md:h-46 md:w-46 h-32 w-32 rounded-full absolute md:top-[25vh] top-[20vh] md:right-[-50px] right-[-35px]"></div>
        </div>
        <div className="bg-white h-[40vh] -mt-28 flex justify-center p-2">
          <div className="shadow-lg md:w-1/2 w-[70%] absolute z-50 bg-white rounded-3xl p-2 relative">
            <div className="flex justify-between items-start w-full p-2">
              <div className="flex gap-3 items-center">
                <h1 className="text-[#1F8435]">{currentQuestion + 1}</h1>
                <div className="w-6 h-3 bg-[#1F8435] rounded-full"></div>
              </div>
              <div className="bg-white -mt-14 rounded-full w-20 h-20 p-2 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-300"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-[#Ad44c7]"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    strokeLinecap="round"
                    stroke={borderColor}
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    style={{
                      transition: "stroke-dashoffset 1s linear, stroke 1s linear",
                    }}
                  />
                </svg>
                <div className="flex justify-center items-center h-full">
                  <h1>{timeLeft} sec</h1>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-6 h-3 bg-[#D05A04] rounded-full"></div>
                <h1 className="text-[#D05A04]">{questions.length - currentQuestion - 1}</h1>
              </div>
            </div>
            <h1 className="text-center text-[#Ad44c7] text-[20px]">
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <div className="my-9 text-center text-[20px]">
              <p>{question?.question}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-b-3xl">
          <div className="my-11 grid md:grid-cols-2 grid-cols-1 justify-around gap-5">
            {question?.options.map((option, index) => {
              const isCorrect = option === question.answer;
              const isSelected = selectedAnswer === option;
              const backgroundColor = isAnswered ? (isCorrect ? 'bg-green-500' : (isSelected ? 'bg-red-500' : '')) : '';
              return (
                <div
                  key={index}
                  className={`answer text-center p-4 rounded-3xl border-2 border-[#Ad44c7] ${backgroundColor}`}
                  onClick={() => handleAnswerClick(option)}
                >
                  <div className="flex items-center justify-between">
                    <h1>{option}</h1>
                    <input
                      type="radio"
                      checked={selectedAnswer === option}
                      readOnly
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleAnswerSubmission}
              className="bg-[#F94144] text-white px-4 py-2 rounded-full ml-4"
             
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
