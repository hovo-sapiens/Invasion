import {memo} from "react";
import PropTypes from "prop-types";
import "./index.css";
import {classNames} from "../../helpers";
import {changeBoardController} from "../../controllers";
import {shallowSelector, selectChangeBoardButtonData} from "../../store/selectors";

const ChangeBoardButton = ({size, isSelected}) => {
    const {isAnimationInProcess, isPlayerTurn} = shallowSelector(selectChangeBoardButtonData);
    const onChangeSizeHandler = () =>  {
        changeBoardController(size);
    };

    return (
        <button
            type="button"
            className={classNames("changeBoardButton", {
                selected: isSelected})
            }
            onClick={isSelected || isAnimationInProcess || !isPlayerTurn ? null : onChangeSizeHandler}
        >
            {size}
        </button>
    )
};

ChangeBoardButton.propTypes = {
    size: PropTypes.string,
    isSelected: PropTypes.bool
};

export default memo(ChangeBoardButton);