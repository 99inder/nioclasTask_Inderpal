import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from '../../services/operations/fetchQuestionAPI';
import Timer from '../common/Timer';
import RenderQuestion from './RenderQuestion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setTestSubmitted } from '../../redux/slices/testSlice';

const TestPage = () => {

  const { questionStats, testSubmitted } = useSelector(state => state.test);

  const [loading, setLoading] = useState(false);

  const [currentQuesIdx, setCurrentQuesIdx] = useState(0);
  const [currentQues, setCurrentQues] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (testSubmitted) {
      toast.success("You have already given the test.")
      navigate("/result");
      return;
    }

    if (questionStats.length <= 0) {
      navigate("/");
      toast.error("Fill in these details first")
    }
    else {
      // getting question from api
      (async () => {
        setLoading(true);

        const response = await fetchQuestion(questionStats[currentQuesIdx]?.questionId);
        setCurrentQues(response);

        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [currentQuesIdx]);

  const handleSubmit = () => {
    dispatch(setTestSubmitted(true));
    navigate("/result");
  }

  return (
    <div className='bg-white h-[calc(100vh-3.5rem)] mt-[3.5rem]'>
      <div className='max-w-[1440px] w-11/12 mx-auto'>
        <Timer loading={loading} />

        {/* RENDER QUESTION */}
        <RenderQuestion quesIdx={currentQuesIdx} >
          {currentQues}
        </RenderQuestion>


        {/* BUTTONS */}
        <div className='bg-pink-500 fixed bottom-0 left-0 py-8 w-screen'>
          <div className='flex justify-between max-w-[1440px] w-11/12 mx-auto font-bold'>
            <div className='space-x-2'>
              <button
                disabled={currentQuesIdx <= 0 || loading}
                onClick={() => setCurrentQuesIdx(prev => prev - 1)}
                className={`bg-blue-500 text-white px-3 py-2 rounded-md outline-[2px] outline-blue-500 ${(currentQuesIdx <= 0 || loading) ? "opacity-30" : "hover:bg-white hover:text-black hover:outline"}`}
              >
                Prev
              </button>

              <button
                disabled={currentQuesIdx >= questionStats?.length - 1 || loading}
                onClick={() => setCurrentQuesIdx(prev => prev + 1)}
                className={`bg-blue-500 text-white px-3 py-2 rounded-md  outline-[2px] outline-blue-500 ${(currentQuesIdx >= questionStats?.length - 1 || loading) ? "opacity-30" : "hover:bg-white hover:text-black hover:outline"}`}
              >
                Next
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className={`bg-yellow-500 text-white px-3 py-2 rounded-md outline-[2px] outline-yellow-500 hover:bg-yellow-100 hover:text-black hover:outline`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage