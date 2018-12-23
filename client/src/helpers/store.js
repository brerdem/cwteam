import {applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from "../reducers";
import history from '../helpers/history'
import {routerMiddleware} from "connected-react-router";


const loggerMiddleware = createLogger();




export const store = createStore(
    rootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware,
            loggerMiddleware
        )
    )
);
