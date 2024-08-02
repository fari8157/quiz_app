import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../Redux/Slice';

const Score = () => {
  const { score, questions, answers } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

 

  // Calculate the number of answered questions
  const totalQuestions = questions.length;
  const totalAnsweredQuestions = answers.length;

  // Calculate correct and wrong answers
  let correctAnswers = 0;
  let wrongAnswers = 0;

  questions.forEach((question, index) => {
    if (answers[index] !== undefined) {
      if (answers[index] === question.answer) {
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }
    }
  });

  // Calculate completion percentage
  const completionPercentage = (totalQuestions > 0) ? (totalAnsweredQuestions / totalQuestions) * 100 : 0;

  const handlePlayAgain = () => {
    dispatch(resetQuiz());
    navigate('/questions');
  };

  const handleExit = () => {
   
    localStorage.clear()
    window.location.reload();
   

  };
  return (
    <div className="overflow-hidden">
      <div className="bg-[#Ad44c7] p-4 relative overflow-hidden">
        <div className="bg-[#A42FC1] md:h-[75vh] h-[45vh] md:rounded-b-[90px] rounded-b-[60px] rounded-3xl z-40 relative">
          <div className="bg-[#Ad44c7] md:h-56 md:w-56 h-32 w-32 rounded-full absolute left-[30%] md:top-[-70px] top-[-35px]"></div>
          <div className="bg-[#Ad44c7] md:h-32 md:w-32 h-20 w-20 rounded-full absolute top-[60px] md:right-[35%] right-[10%]"></div>
          <div className="bg-[#Ad44c7] md:h-46 md:w-46 h-32 w-32 rounded-full absolute md:top-[30vh] top-[15vh] md:left-[-50px] left-[-35px]"></div>
          <div className="bg-[#Ad44c7] md:h-46 md:w-46 h-32 w-32 rounded-full absolute md:top-[25vh] top-[20vh] md:right-[-50px] right-[-35px]"></div>
          <div className="bg-[#BB63D1] h-56 w-56 rounded-full absolute left-[40%] top-[20%] p-4">
            <div className="rounded-full p-3 bg-[#CF91DF] h-full w-full">
              <div className="rounded-full p-2 bg-white h-full w-full">
                <div className="w-full h-full flex flex-col justify-center items-center text-[#Ad44c7] text-3xl">
                  <h1>Your Score</h1>
                  <h1>{score}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[30vh] -mt-28 flex justify-center p-2">
          <div className="shadow-lg md:w-1/2 w-[70%] absolute z-50 bg-white rounded-3xl p-2">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-[#Ad44c7] rounded-full" />
                  <div className="flex flex-col">
                    <h1 className="text-[#Ad44c7]">{completionPercentage.toFixed(2)}%</h1>
                    <h1>Completion</h1>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-[#Ad44c7] rounded-full" />
                  <div className="flex flex-col">
                    <h1 className="text-[#Ad44c7]">{totalAnsweredQuestions}</h1>
                    <h1>Total Answered Questions</h1>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-[#1F8435] rounded-full" />
                  <div className="flex flex-col">
                    <h1 className="text-[#1F8435]">{correctAnswers}</h1>
                    <h1>Correct</h1>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-[#FA3939] rounded-full" />
                  <div className="flex flex-col">
                    <h1 className="text-[#FA3939]">{wrongAnswers}</h1>
                    <h1>Wrong</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-b-3xl flex justify-center items-center gap-2">
          <button
            onClick={handlePlayAgain}
            className="py-3 px-6 bg-[#Ad44c7] rounded-md text-white flex items-center"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            Play again
          </button>
          <button
            onClick={handleExit}
            className="py-3 px-6 bg-[#d33b47] rounded-md text-white flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;
