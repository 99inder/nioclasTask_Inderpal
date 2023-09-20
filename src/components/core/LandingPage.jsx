import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import questionIds from '../../data/questionIds';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetTest, setQuestionStatsStructure, setTotalTime, setUsername } from '../../redux/slices/testSlice';

const LandingPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const usernameRef = useRef();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const { testSubmitted } = useSelector(state => state.test)

  useEffect(() => {
    if (!testSubmitted)
      dispatch(resetTest());
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedQuestionIds.length <= 0) {
      toast.error("Select atleast 1 question");
      return;
    }

    // setting username in redux
    dispatch(setUsername(usernameRef.current.value));

    // set Total time in redux store
    dispatch(setTotalTime(selectedQuestionIds.length * 5 * 60));

    // setting selected questions in redux in structured manner
    // so that the time taken for each question is easy to store
    const structure = selectedQuestionIds.map(id => {
      return {
        questionId: id,
        timeTaken: 0,
      }
    });
    dispatch(setQuestionStatsStructure(structure));

    // clearing the form input field
    usernameRef.current.value = "";

    // clear selectedQuestionsId state
    setSelectedQuestionIds([]);

    // navigate to next step
    navigate("/test");
  }

  const handleChange = (e) => {
    e.target.checked ?
      setSelectedQuestionIds(prev => [...prev, e.target.value])
      :
      setSelectedQuestionIds(prev => prev.filter((id) => id !== e.target.value));
  }

  return (
    <div className='max-w-[1440px] w-11/12 mx-auto'>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-10 bg-slate-100 px-4 py-6 max-w-[600px] mx-auto mt-20 mb-8 rounded-xl drop-shadow-lg'

      >
        <input
          type="text"
          ref={usernameRef}
          minLength={3}
          required
          placeholder='Enter your name'
          className='h-[60px] rounded-md px-3'
        />

        <p className='text-xl font-semibold text-center'>Select the questions for the test</p>
        {
          questionIds.map((questionId, index) => (
            <span
              key={index}
              className='space-x-4'
            >
              <input
                onChange={handleChange}
                type="checkbox"
                name=""
                value={questionId}
                id={questionId}
              />
              <label htmlFor={questionId}>{questionId}</label>
            </span>
          ))
        }

        <button type="submit" className='bg-blue-400 hover:bg-blue-500 p-5 rounded-md text-white font-medium'>
          Proceed
        </button>
      </form>
    </div>
  )
}

export default LandingPage