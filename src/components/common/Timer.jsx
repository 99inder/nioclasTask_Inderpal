import React, { useState, useEffect } from 'react';
import formatTime from '../../utils/formatTime';
import { useSelector } from 'react-redux';

function Timer({ loading }) {
    // State to hold the elapsed time in seconds
    const [elapsedTime, setElapsedTime] = useState(0);
    const { totalTime } = useSelector(state => state.test);

    useEffect(() => {
        let updateTimer;

        if (!loading) {
            updateTimer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(updateTimer);
    }, [loading]);

    return (
        <div className='flex justify-end'>
            <div>
                <h1 className='font-medium text-lg'>Timer:</h1>
                <div className='flex gap-x-3 justify-end'>
                    <p>Time Elapsed: <span className='font-medium'>{formatTime(elapsedTime)}</span></p>
                    <span className='font-semibold'>|</span>
                    <p>Total Duration: <span className='font-medium'>{formatTime(totalTime)}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Timer;
