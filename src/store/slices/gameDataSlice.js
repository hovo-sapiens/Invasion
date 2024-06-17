import {createSlice} from "@reduxjs/toolkit";
import {GAME_MATRICES, GAME_MATRIX_SIZES, GAME_STATUSES} from "../../constants";

const {START, IN_PROCESS, FINISHED} = GAME_STATUSES;
const {LARGE} = GAME_MATRIX_SIZES;

const initialState = {
    matrix: GAME_MATRICES[LARGE],
    matrixSize: LARGE,
    validMoves: {
        firstWave: null,
        secondWave: null
    },
    selectedCell: null,
    targetCells: null,
    targetColorId: 0,
    isPlayerTurn: true,
    gameStatusId: START,
    gameScore: {
        playerScore: 2,
        opponentScore: 2
    },
    gameResult: null
}

const gameDataSlice = createSlice({
    name: 'gameData',
    initialState,
    reducers: {
        setGameIsStarted: (state) => {
            state.gameStatusId = IN_PROCESS;
        },
        setGameIsEnded: (state) => {
            state.gameStatusId = FINISHED;
        },
        changeGameBoard: (state, {payload}) => {
            return {...initialState, matrix: GAME_MATRICES[payload], matrixSize: payload, gameStatusId: IN_PROCESS};
        },
        setGameResult: (state, {payload}) => {
            state.gameResult = payload;
        },
        setGameScore: (state, {payload}) => {
            state.gameScore = payload
        },
        setValidMoves: (state, action) => {
            state.validMoves = action.payload;
        },
        resetValidMoves: (state) => {
            state.validMoves = {
                firstWave: null,
                secondWave: null
            }
        },
        setSelectedCell: (state, action) => {
            state.selectedCell = action.payload
        },
        resetSelectedCell: (state) => {
            state.selectedCell = null;
        },
        setTargetCells: (state, {payload}) => {
            state.targetCells = payload.targetCells;
            state.targetColorId = payload.colorId;
        },
        resetTargetCells: (state) => {
            state.targetCells = null;
            state.targetColorId = 0;
        },
        setIsPlayerTurn: (state, action) => {
            state.isPlayerTurn = action.payload
        },
        nullifySelectedCell: (state, {payload: {cellIndex, rowIndex}}) => {
            state.selectedCell = null;
            state.matrix[rowIndex][cellIndex] = 0;
        },
        invadeCells: (state) => {
            const {matrix, targetCells, targetColorId} = state;
            targetCells.forEach(({cell, row}) => {
                matrix[row][cell] = targetColorId;
            });
        },
        resetGameData: () => initialState
    },
})

export const {
    setGameIsStarted,
    setGameIsEnded,
    changeGameBoard,
    setGameResult,
    setGameScore,
    setValidMoves,
    setSelectedCell,
    setTargetCells,
    setIsPlayerTurn,
    resetValidMoves,
    resetSelectedCell,
    resetTargetCells,
    nullifySelectedCell,
    invadeCells,
    resetGameData
} = gameDataSlice.actions
export default gameDataSlice.reducer