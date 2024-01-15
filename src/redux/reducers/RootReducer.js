import { combineReducers } from "redux";
import movieReducer from "./MovieReducer";
import userReducer from "./UserReducer";

export const rootReducer = combineReducers({ movieReducer, userReducer });
