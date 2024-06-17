import {CellsSet} from "../classes/CellsSet";
import {CELL_IDS} from "../constants";

const {PLAYER, OPPONENT, EMPTY} = CELL_IDS;

const findEmptyCells = ({matrix, cellIndex, rowIndex, waveIndex = 1, filterCellId = EMPTY, callback}) => {
    const matrixSize = matrix.length;
    const firstRow = (rowIndex - waveIndex) > -1 ? (rowIndex - waveIndex) : 0;
    const lastRow = (rowIndex + waveIndex) < matrixSize ? (rowIndex + waveIndex + 1) : matrixSize;
    const firstCell = (cellIndex - waveIndex) > -1 ? (cellIndex - waveIndex) : 0;
    const lastCell = (cellIndex + waveIndex) < matrixSize ? (cellIndex + waveIndex + 1) : matrixSize;
    const waveDif = waveIndex - 1;

    for (let i = firstRow; i < lastRow; ++i) {
        const rowDif = Math.abs(rowIndex - i);
        for (let j = firstCell; j < lastCell; ++j) {
            const cellDif = Math.abs(cellIndex - j)
            if (matrix[i][j] === filterCellId && (rowDif > waveDif || cellDif > waveDif)) {
                callback({row: i, cell: j});
            }
        }
    }
}

export const classNames = (className, conditionalClassNames) => {
    let returnValue = className;
    const keys = Object.keys(conditionalClassNames)
    keys.forEach((key) => {
        if(conditionalClassNames[key]) {
            returnValue +=` ${key}`;
        }
    });
    return returnValue;
}

export const detectWave = ({matrix, cellIndex, rowIndex, waveIndex = 1, filterCellId = EMPTY}) => {
    const wave  = [];
    findEmptyCells({
        matrix, cellIndex, rowIndex, waveIndex, filterCellId, callback: (cell) => wave.push(cell)
    })

    return wave;
}

export const detectIsValidMoveLeft = ({matrix, cells}) => {
    const validToPlay = new CellsSet();

    for (let i = 0, len = cells.length; i < len; ++i) {
        const {cell: cellIndex, row: rowIndex} = cells[i];
        findEmptyCells({
            matrix, cellIndex, rowIndex, callback: () => {
                validToPlay.add({cell: cellIndex, row: rowIndex});
            }
        });
        findEmptyCells({
            matrix, cellIndex, rowIndex, waveIndex: 2, callback: () => {
                validToPlay.add({cell: cellIndex, row: rowIndex});
            }
        });
    }

    return validToPlay.values();
}

export const filterPlayerAndOpponentCells = (matrix) => {
    const playerCells = [];
    const opponentCells = [];
    const emptyCells = [];

    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === PLAYER) {
                playerCells.push({cell: cellIndex, row: rowIndex});
            } else if (cell === OPPONENT) {
                opponentCells.push({cell: cellIndex, row: rowIndex});
            } else {
                emptyCells.push({cell: cellIndex, row: rowIndex});
            }
        })
    });

    return {playerCells, opponentCells, emptyCells}
}