import {memo} from "react";
import "./index.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {classNames} from "../../helpers";

const PlayerScore = ({isPlayer}) => {
    const score = useSelector(state => state.gameData.gameScore[isPlayer ? "playerScore" : "opponentScore"]);

    return (
        <div className={classNames("scoreContainer", {player: isPlayer, opponent: !isPlayer})}>
            <span>SCORE :</span>
            <span>{` ${score}`}</span>
        </div>
    )
}

PlayerScore.propTypes = {
    isPlayer: PropTypes.bool
}

export default memo(PlayerScore);