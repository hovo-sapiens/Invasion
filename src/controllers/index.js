import store from "../store/store";
import {
    changeGameBoard,
    invadeCells,
    nullifySelectedCell, resetGameData,
    resetSelectedCell,
    resetTargetCells,
    resetValidMoves, setGameIsEnded,
    setGameIsStarted, setGameResult,
    setGameScore,
    setIsPlayerTurn,
    setSelectedCell,
    setTargetCells,
    setValidMoves
} from "../store/slices/gameDataSlice";
import {detectIsValidMoveLeft, detectWave, filterPlayerAndOpponentCells} from "../helpers";
import {
    resetAnimations,
    setAnimationIsFinished,
    setAnimationIsStarted,
    setAnimationType
} from "../store/slices/animationsSlice";
import {ANIMATION_TYPES, CELL_IDS} from "../constants";

const {dispatch, getState} = store;
const {PLAYER, OPPONENT} = CELL_IDS;
const {STEP, JUMP, FINISH} = ANIMATION_TYPES;

export const startGameController = () => {
    dispatch(setGameIsStarted());
}
export const selectedCellController = (cellIndex, rowIndex) => {
    const {matrix} = getState().gameData;
    const firstWave = detectWave({matrix, cellIndex, rowIndex});
    const secondWave = detectWave({matrix, cellIndex, rowIndex, waveIndex: 2});

    dispatch(setSelectedCell({cell: cellIndex, row: rowIndex}));
    dispatch(setValidMoves({firstWave, secondWave}));
}

export const targetCellsController = (cellIndex, rowIndex) => {
    const {matrix, isPlayerTurn, selectedCell: {cell, row}} = getState().gameData;
    const targetCells = [
        {cell: cellIndex, row: rowIndex},
        ...detectWave({
            matrix,
            cellIndex,
            rowIndex,
            filterCellId: isPlayerTurn ? OPPONENT : PLAYER
        })
    ];
    const animationType = (Math.abs(cell - cellIndex) > 1 || Math.abs(row - rowIndex) > 1) ? JUMP : STEP;

    dispatch(setAnimationIsStarted());
    dispatch(setAnimationType(animationType));
    dispatch(setTargetCells({targetCells, colorId: isPlayerTurn ? PLAYER : OPPONENT}));
}

export const setJumpFinishedController = (cellIndex, rowIndex) => {
    dispatch(setAnimationType(STEP));
    dispatch(nullifySelectedCell({cellIndex, rowIndex}));
}

const opponentAutoPlayController = (cellIndex, rowIndex) => {
    setTimeout(() => {
        selectedCellController(cellIndex, rowIndex);
        setTimeout(() => {
            const {firstWave, secondWave} = getState().gameData.validMoves;
            let cellIndex, rowIndex;
            if (firstWave.length > 0) {
                const {cell, row} = firstWave[Math.floor(Math.random() * firstWave.length)];
                cellIndex = cell;
                rowIndex = row;
            } else {
                const {cell, row} = secondWave[Math.floor(Math.random() * secondWave.length)];
                cellIndex = cell;
                rowIndex = row;
            }

            targetCellsController(cellIndex, rowIndex);
        }, 1000);
    }, 800);
}

const gameResultController = () => {
    const {matrix} = getState().gameData;
    const {playerCells, opponentCells} = filterPlayerAndOpponentCells(matrix);
    const playerScore = playerCells.length;
    const opponentScore = opponentCells.length;
    const gameResult = playerScore > opponentScore ? 1 : playerScore < opponentScore ? 2 : 3;

    dispatch(setGameScore({playerScore, opponentScore}));
    setTimeout(() => {
        dispatch(setGameResult(gameResult));
    }, 500)

}

const isValidMoveLeftController = () => {
    const {matrix, isPlayerTurn} = getState().gameData;

    const {playerCells, opponentCells, emptyCells} = filterPlayerAndOpponentCells(matrix);
    const validMoves = detectIsValidMoveLeft({matrix, cells: isPlayerTurn ? playerCells : opponentCells});

    if (validMoves.length > 0) {
        dispatch(setGameScore({playerScore: playerCells.length, opponentScore: opponentCells.length}))
        dispatch(setAnimationIsFinished());
        if (!isPlayerTurn) {
            const {cell, row} = validMoves[Math.floor(Math.random() * validMoves.length)];
            opponentAutoPlayController(cell, row);
        }
    } else {
        dispatch(setAnimationType(FINISH));
        dispatch(setTargetCells({targetCells: emptyCells, colorId: isPlayerTurn ? OPPONENT : PLAYER}));
        dispatch(setGameIsEnded());
    }
}

export const setStepFinishedController = () => {
    const {gameData: {isPlayerTurn}, animations: {animationType}} = getState();

    dispatch(invadeCells());
    dispatch(resetValidMoves());
    dispatch(resetSelectedCell());
    dispatch(resetTargetCells());
    dispatch(setIsPlayerTurn(!isPlayerTurn));
    if (animationType === STEP) {
        isValidMoveLeftController()
    } else if (animationType === FINISH) {
        gameResultController();
    }
}

export const changeBoardController = (boardSize) => {
    dispatch(changeGameBoard(boardSize));
    dispatch(resetAnimations());
}

export const resetGameController = () => {
    dispatch(resetGameData());
    dispatch(resetAnimations());
}