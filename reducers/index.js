import { combineReducers } from "redux";
import userReducer from "./UserReducer";

const rootReducers = combineReducers({
  user: userReducer,
});

export default rootReducers;
