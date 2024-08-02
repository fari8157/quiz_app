import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../Redux/Slice';
const Home = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      dispatch(setUserName(name));
      navigate('/questions');
    }
  };
  return (
    <div className=" h-screen overflow-hidden  bg-[#Ad44c7] p-5">
      <div className=' h-full bg-[#A42FC1] md:rounded-b-[100px] rounded-[30px] relative'>
        <div className='bg-[#Ad44c7] md:h-56 md:w-56 h-32 w-32 rounded-full absolute left-[30%] md:top-[-70px] top-[-35px]'></div>
        <div className='bg-[#Ad44c7] md:h-32 md:w-32 h-20 w-20 rounded-full absolute top-[60px] md:right-[35%] right-[10%]'></div>
        <div className='bg-[#Ad44c7] md:h-56 md:w-56 h-32 w-32 rounded-full absolute top-[30vh] md:left-[-70px] left-[-35px]'></div>
        <div className='bg-[#Ad44c7] md:h-56 md:w-56 h-32 w-32 rounded-full absolute top-[30vh] md:right-[-70px] right-[-35px]'></div>
        <div className='flex flex-col justify-center items-center h-full text-center   '>
          <div className='flex items-center mb-4 z-40'>
            <FontAwesomeIcon icon={faQuestionCircle} className='text-white text-2xl md:text-4xl mr-2' />
            <h1 className='text-white text-3xl md:text-[50px] '>Welcome Quiz</h1>
          </div>
          <p className='text-white mb-6 w-3/4 md:w-1/2 lg:w-1/3 z-40'>Test your knowledge with our fun and engaging quiz!</p>
          <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
          className='p-2 rounded-md focus:border-[#A42FC1]'
        />
        <button
          onClick={handleSubmit}
          className='py-2 px-4 bg-[#1d1c1d] rounded-md text-white'
        >
          Submit
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
