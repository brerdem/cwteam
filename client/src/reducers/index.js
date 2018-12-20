import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import authReducer from "./auth";
import todoReducer from "./todos";
import uiReducer from "./ui";

 const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    todo: todoReducer,
    ui: uiReducer
});

export default rootReducer;

