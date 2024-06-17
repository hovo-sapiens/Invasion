import {useState} from "react";
import "./index.css";
import {startGameController} from "../../controllers";

const StartGame = () => {
    const [showRules, setShowRules] = useState(false);

    return (
        <div className="startGameContainer">
            <button type="button" className="startButton" onClick={startGameController}>START</button>
            <button type="button" className="rulesButton" onClick={() => {setShowRules(true)}}>rules</button>
            {showRules && (
                <div className="rulesContainer">
                    <button type="button" className="closeRules" onClick={() => {setShowRules(false)}}>X</button>
                    <p>
                        <span>
                            This is a board game where the aim is to cover the board with more pieces than your opponent.
                        </span>
                        <span>
                            After pressing the START button, the game board will appear in front of you. You can choose
                            between three possible board sizes: 10 x 10, 9 x 9, and 8 x 8, respectively. At the
                            beginning, you will have 2 green squares.
                        </span>
                        <span>
                            You can choose any of your squares to move by clicking on them. If the square is valid to
                            play on, the board will display possible positions for the selected square to move to.
                            Click on any of those squares to make a move.
                        </span>
                        <span>
                            In this game, there are two possible move types. The first type is when you move to a nearby
                            position, in which case you will add a new square to your squares. The second type is when
                            you move to one position further from the selected square, in which case your selected
                            square will disappear from its original position and appear at the newly selected position.
                        </span>
                        <span>
                            After your move, all opponent squares that are positioned next to your new square will
                            transform into your squares. After each move, you will see your and your opponent's updated
                            scores.
                        </span>
                        <span>
                            The game will end when there are no remaining empty squares, or one of the players is unable
                            to make a move because the empty squares are blocked by the other player. In this case, all
                            remaining empty squares will automatically be occupied by the player who made the last move.
                            The player who has the most squares will win.
                        </span>
                    </p>
                </div>
            )}
        </div>
    )
};

export default StartGame;