import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordTime } from '../../redux/slices/testSlice';

const RenderQuestion = ({ children, quesIdx }) => {

    const dispatch = useDispatch();

    const { questionStats } = useSelector(state => state.test);

    useEffect(() => {
        let elapsedTime = 0;
        let updateTimer;

        elapsedTime = questionStats[quesIdx]?.timeTaken;

        updateTimer = setInterval(() => {
            elapsedTime = elapsedTime + 1;
        }, 1000);


        return () => {
            dispatch(recordTime({ index: quesIdx, timeTaken: elapsedTime }));
            elapsedTime = 0;
            clearInterval(updateTimer);
        };
        // eslint-disable-next-line
    }, [quesIdx])

    // MathJax config
    const config = {
        tex: {
            inlineMath: [['$', '$']],
        },
    };

    if (children.length <= 0)
        return (
            <></>
        )
        
    return (
        <div className='text-xl md:text-2xl pt-7 pb-4 overflow-x-scroll md:overflow-x-hidden'>
            <MathJaxContext config={config}>
                <MathJax inline>
                    {children}
                </MathJax>
            </MathJaxContext>
        </div>
    )


}

export default RenderQuestion