import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'


import authReducer from "./auth";
import uiReducer from "./ui";
import projectReducer from "./project";
import userReducer from "./user";
import taskReducer from "./task";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    tasks: taskReducer,
    ui: uiReducer,
    projects: projectReducer,
    users: userReducer,
    form: formReducer
});

export default rootReducer;

