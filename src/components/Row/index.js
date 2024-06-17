import {memo} from "react";
import PropTypes from "prop-types";
import "./index.css";
import Cell from "../Cell";
const Row = ({index, cells}) => {
    return (
        <div className="row">
            {cells.map((cell, cellIndex) => (
                <Cell
                    key={`${index}-${cellIndex}-${cell}`}
                    index={cellIndex}
                    rowIndex={index}
                    id={cell}
                />
            ))}
        </div>
    )
};

Row.propTypes = {
    index: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired
};

export default memo(Row);