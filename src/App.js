import './App.css';
import {useSelector} from "react-redux";
import GameContainer from "./components/GameContainer";
import StartGame from "./components/StartGame";
import {selectGameIsNotStarted} from "./store/selectors";

function App() {
    const gameIsNotStarted = useSelector(selectGameIsNotStarted);

  return (
    <div className="App">
        {gameIsNotStarted ? <StartGame /> : <GameContainer />}
    </div>
  );
}

export default App;
