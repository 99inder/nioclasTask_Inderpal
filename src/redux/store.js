import { configureStore } from '@reduxjs/toolkit'
import testReducer from './slices/testSlice';

const store = configureStore({
    reducer: {
        test: testReducer,
    },
})

export default store;