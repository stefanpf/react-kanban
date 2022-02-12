import { combineReducers } from "redux";
import { userDataReducer } from "./user_data/slice.js";
import { tasksReducer } from "./tasks/slice.js";
import { modalReducer } from "./modal/slice.js";
import { projectsReducer } from "./projects/slice.js";

const rootReducer = combineReducers({
    userData: userDataReducer,
    tasks: tasksReducer,
    modal: modalReducer,
    projects: projectsReducer,
});

export default rootReducer;
