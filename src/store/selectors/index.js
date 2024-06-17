import {shallowEqual, useSelector} from "react-redux";
import {ANIMATION_TYPES, GAME_STATUSES} from "../../constants";

const {START, IN_PROCESS} = GAME_STATUSES;
const {STEP, JUMP, FINISH} = ANIMATION_TYPES;

// eslint-disable-next-line react-hooks/rules-of-hooks
export const shallowSelector = (selector) => useSelector(selector, shallowEqual);

export const selectGameIsNotStarted = (state) => {
    return state.gameData.gameStatusId === START;
}

export const selectGameContainerData = (state) => {
    const {gameResult, gameStatusId} = state.gameData;
    const isGameInProcess = gameStatusId === IN_PROCESS;

    return {gameResult, isGameInProcess};
}

export const selectBoardData = (state) => {
    const {matrix} = state.gameData;

    return {matrix}
}

export const selectCellData = (state, cellIndex, rowIndex) => {
    const {animations, gameData} = state
    const {isAnimationInProcess, animationType} = animations;
    const {isPlayerTurn, selectedCell, validMoves, targetCells, targetColorId} = gameData;
    const {cell, row} = selectedCell ?? {};
    const {firstWave, secondWave} = validMoves;
    const lastTargetCell = targetCells?.length > 0 ? targetCells[targetCells?.length - 1] : false;
    const isCellSelected = cell === cellIndex && row === rowIndex;
    const isAnyCellSelected = !!selectedCell;
    const isFirstWaveValid = firstWave?.indexOf(firstWave?.find(({row, cell}) => row === rowIndex && cell === cellIndex)) > -1 || false;
    const isSecondWaveValid = secondWave?.indexOf(secondWave?.find(({row, cell}) => row === rowIndex && cell === cellIndex)) > -1 || false;
    const isLastTargetCell = cellIndex === lastTargetCell?.cell && rowIndex === lastTargetCell?.row;
    const invadeCell = (targetCells?.indexOf(targetCells?.find(({row, cell}) => row === rowIndex && cell === cellIndex)) > -1 || false) && (animationType === STEP || animationType === FINISH);
    const nullifyCell = isCellSelected && animationType === JUMP;

    return {
        isPlayerTurn,
        isCellSelected,
        isAnyCellSelected,
        isFirstWaveValid,
        isSecondWaveValid,
        isLastTargetCell,
        invadeCell,
        targetColorId,
        nullifyCell,
        isAnimationInProcess
    }
}

export const selectChangeBoardButtonData = (state) => {
    const {gameData: {isPlayerTurn}, animations: {isAnimationInProcess}} = state;

    return {isPlayerTurn, isAnimationInProcess}
}