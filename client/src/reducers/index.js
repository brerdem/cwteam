import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import authReducer from "./auth";
import todoReducer from "./todos";
import uiReducer from "./ui";
import projectReducer from "./projects";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    todo: todoReducer,
    ui: uiReducer,
    project: projectReducer
});

export default rootReducer;

