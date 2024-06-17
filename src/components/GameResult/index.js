import {memo, useEffect} from "react";
import PropTypes from "prop-types";
import "./index.css";
import {resetGameController} from "../../controllers";
import {classNames} from "../../helpers";
import {GAME_RESULT_MESSAGES} from "../../constants";

let timeOut = null;

const GameResult = ({gameResult}) => {
    useEffect(() => {
        timeOut = setTimeout(resetGameController, 3000);

        return () => {clearTimeout(timeOut)};
    }, []);

    console.log("?? >> result", gameResult)

    return (
        <div className={classNames("gameResult", {
            victory: gameResult === 1,
            defeat: gameResult === 2,
            draw: gameResult === 3})
        }>
            <p>{GAME_RESULT_MESSAGES[gameResult]}</p>
        </div>
    )
};

GameResult.propTypes = {
    gameResult: PropTypes.number
}

export default memo(GameResult)