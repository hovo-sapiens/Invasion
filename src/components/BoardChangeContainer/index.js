import {memo} from "react";
import {useSelector} from "react-redux";
import "./index.css";
import {GAME_MATRIX_SIZES} from "../../constants";
import ChangeBoardButton from "../ChangeBoardButton";

const matrixSizes = Object.values(GAME_MATRIX_SIZES);

const BoardChangeContainer = () => {
    const boardSelectedSize = useSelector(state => state.gameData.matrixSize);

    return (
        <div className="boardChangeContainer">
            {matrixSizes.map(size => {
                const isSelected = size === boardSelectedSize;

                return (
                    <ChangeBoardButton size={size} isSelected={isSelected} />
                )
            })}
        </div>
    )
};

export default memo(BoardChangeContainer);