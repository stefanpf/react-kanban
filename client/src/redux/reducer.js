import { combineReducers } from "redux";
import { tasksReducer } from "./tasks/slice.js";

const rootReducer = combineReducers({
    tasks: tasksReducer,
});

export default rootReducer;
