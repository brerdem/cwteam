import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import authReducer from "./auth";
import taskReducer from "./task";
import uiReducer from "./ui";
import projectReducer from "./project";
import userReducer from "./user";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    todos: taskReducer,
    ui: uiReducer,
    projects: projectReducer,
    users: userReducer
});

export default rootReducer;

