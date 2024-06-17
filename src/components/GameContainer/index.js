import "./index.css";
import Board from "../Board";
import PlayerTurnHolder from "../PlayerTurnHolder";
import PlayerScore from "../PlayerScore";
import GameResult from "../GameResult";
import BoardChangeContainer from "../BoardChangeContainer";
import {shallowSelector, selectGameContainerData} from "../../store/selectors";

const GameContainer = () => {
    const {gameResult, isGameInProcess} = shallowSelector(selectGameContainerData);

    return (
        <div className="gameContainer">
            {gameResult && <GameResult gameResult={gameResult} />}
            <BoardChangeContainer />
            <div className="boardContainer">
                <PlayerScore />
                {isGameInProcess && <PlayerTurnHolder/>}
                <Board/>
                {isGameInProcess && <PlayerTurnHolder isPlayer/>}
                <PlayerScore isPlayer />
            </div>
        </div>
    )
}

export default GameContainer;