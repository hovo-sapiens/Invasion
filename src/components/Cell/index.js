import {memo, useMemo} from "react";
import PropTypes from "prop-types";
import "./index.css";
import {classNames} from "../../helpers";
import {selectedCellController, setJumpFinishedController, setStepFinishedController, targetCellsController} from "../../controllers";
import {shallowSelector, selectCellData} from "../../store/selectors";
import {CELL_IDS} from "../../constants";

const {PLAYER, OPPONENT} = CELL_IDS;

const Cell = ({index, rowIndex, id}) => {
    const {
        isAnimationInProcess,
        isPlayerTurn,
        isCellSelected,
        isLastTargetCell,
        isAnyCellSelected,
        isFirstWaveValid,
        isSecondWaveValid,
        invadeCell,
        targetColorId,
        nullifyCell
    } = shallowSelector((state) => selectCellData(state, index, rowIndex));

    const [isPlayerCell, isOpponentCell] = useMemo(() => ([id === PLAYER, id === OPPONENT]), [id])

    const onSelectHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAnyCellSelected && id === 0 && (isFirstWaveValid || isSecondWaveValid)) {
            targetCellsController(index, rowIndex);
        } else if ((isPlayerTurn && isPlayerCell)) {
            isCellSelected || selectedCellController(index, rowIndex);
        }
    }
    const onJumpAnimationEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (nullifyCell) {
            setJumpFinishedController(index, rowIndex);
        }
    }

    const onStepAnimationEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setStepFinishedController();
    }

    return (
        <div className="cellWrapper" onClick={isAnimationInProcess ? null : onSelectHandler}>
            <div
                className={classNames("cell", {
                    red: isOpponentCell || (!isPlayerTurn && (isFirstWaveValid || isSecondWaveValid)),
                    green: isPlayerCell || (isPlayerTurn && (isFirstWaveValid || isSecondWaveValid)),
                    selected: isCellSelected,
                    valid: (isPlayerTurn && isPlayerCell)  || isFirstWaveValid || isSecondWaveValid,
                    firstWaveValid: isFirstWaveValid,
                    secondWaveValid: isSecondWaveValid,
                    nullifyCell: nullifyCell,

                })}
                onAnimationEnd={onJumpAnimationEnd}
            >
                <div
                    className={classNames("cellInner", {
                        red: targetColorId === OPPONENT,
                        green: targetColorId === PLAYER,
                        invadeCell: invadeCell
                    })}
                    onAnimationEnd={isLastTargetCell ? onStepAnimationEnd : null}
                />
            </div>
        </div>
    )
};

Cell.propTypes = {
    index: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
};

export default memo(Cell);