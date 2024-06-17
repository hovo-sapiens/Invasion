import {combineReducers} from "redux";
import gameDataReducer from "./gameDataSlice";
import animationsReducer from "./animationsSlice"

export const rootReducer = combineReducers({gameData: gameDataReducer, animations: animationsReducer})