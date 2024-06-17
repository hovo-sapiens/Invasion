import {memo} from "react";
import "./index.css";
import {selectBoardData, shallowSelector} from "../../store/selectors";
import Row from "../Row";
const Board = () => {
    const {matrix} = shallowSelector(selectBoardData)

    return (
        <div className="board">
            {matrix.map((row, rowIndex) => {
                return (
                    <Row key={rowIndex} index={rowIndex} cells={row} />
                )
            })}
        </div>
    )
}

export default memo(Board);