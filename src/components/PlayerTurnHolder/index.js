import {memo} from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import "./index.css";

const PlayerTurnHolder = ({isPlayer}) => {
    const isPlayerTurn = useSelector(state => state.gameData.isPlayerTurn);

    return (
        <div className="turnHolder">
            {((isPlayer && isPlayerTurn) || (!isPlayer && !isPlayerTurn)) &&
                <span className={isPlayer ? "player" : "opponent"}>{isPlayer ? "YOUR TURN" : "OPPONENT'S TURN"}</span>}
        </div>
    )
}

PlayerTurnHolder.propTypes = {
    isPlayer: PropTypes.bool
};

export default memo(PlayerTurnHolder);