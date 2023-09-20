import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import formatTime from '../../utils/formatTime';
import { resetTest, setTestSubmitted } from '../../redux/slices/testSlice';

const ResultPage = () => {

    const { username, questionStats, testSubmitted } = useSelector(state => state.test);
    const dispatch = useDispatch();

    const calculateTotalTime = () => {

        let totalTime = 0;

        questionStats.forEach(item => {
            totalTime += item.timeTaken
        })

        return formatTime(totalTime)
    };

    useEffect(() => {

        return () => {
            dispatch(setTestSubmitted(false));
            dispatch(resetTest());
        }
        // eslint-disable-next-line
    }, [])

    if (testSubmitted)
        return (
            <div className='max-w-[1440px] w-11/12 mx-auto pt-10 md:pt-20'>
                <div className='flex flex-col gap-y-2 bg-slate-100 px-4 py-6 max-w-[600px] mx-auto mt-20 mb-8 rounded-xl drop-shadow-lg'>

                    <h1 className='text-center uppercase font-bold text-2xl'>Result</h1>
                    <p className='text-lg'><span className='font-medium'>Name:</span> {username}</p>
                    <p className='text-lg space-x-2'>
                        <span className='font-medium'>
                            Total Time Taken:
                        </span>
                        <span>
                            {calculateTotalTime()}
                        </span>
                    </p>

                    <table className="table-auto border-collapse border border-slate-400 mt-2">
                        <thead>
                            <tr>
                                <th className="border border-slate-300 px-3 py-2">Question ID</th>
                                <th className="border border-slate-300 px-3 py-2">Time Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                questionStats.map((ques, idx) => (
                                    <tr key={idx} className='text-center'>
                                        <td className="border border-slate-300 px-3 py-2">{ques.questionId}</td>
                                        <td className="border border-slate-300 px-3 py-2">{formatTime(ques.timeTaken)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )

    else {
        toast.error("You haven't taken the test yet")
        return (
            <Navigate to={"/"} />
        )
    }
}

export default ResultPage