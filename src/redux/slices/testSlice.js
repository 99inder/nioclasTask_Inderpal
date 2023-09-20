import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    totalTime: 0,
    questionStats: [],
    testSubmitted: false,
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setTotalTime: (state, action) => {
            state.totalTime = action.payload;
        },
        setQuestionStatsStructure: (state, action) => {
            state.questionStats = action.payload
        },
        recordTime: (state, action) => {
            const { index, timeTaken } = action.payload;

            if (index >= 0 && index < state.questionStats.length) {
                state.questionStats[index].timeTaken = timeTaken;
            }
        },
        setTestSubmitted: (state, action) => {
            state.testSubmitted = action.payload;
        },
        resetTest: (state) => {
            state.username = "";
            state.totalTime = 0;
            state.questionStats = [];
        }
    }
});

export const { setUsername, setTotalTime, setQuestionStatsStructure, recordTime, recordTotalTimeTaken, setTestSubmitted, resetTest } = testSlice.actions;
export default testSlice.reducer;