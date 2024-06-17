import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    animationType: null,
    isAnimationInProcess: false
}

const animationsSlice = createSlice({
    name: 'animations',
    initialState,
    reducers: {
        setAnimationType: (state, action) => {
            state.animationType = action.payload;
        },
        setAnimationIsStarted: (state) => {
            state.isAnimationInProcess = true;
        },
        setAnimationIsFinished: (state) => {
            state.animationType = null;
            state.isAnimationInProcess = false;
        },
        resetAnimations: () => initialState
    },
})

export const {
    setAnimationType,
    setAnimationIsStarted,
    setAnimationIsFinished,
    resetAnimations
} = animationsSlice.actions
export default animationsSlice.reducer