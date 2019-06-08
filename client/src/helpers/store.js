import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from "../reducers";
import history from '../helpers/history'
import {routerMiddleware} from "connected-react-router";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import API_URL from '../helpers/api_url';

const loggerMiddleware = createLogger();

//todo remove localhost on production
//todo when user first logged in, get token from state or elsewhere not from local storage
const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: API_URL,
    responseType: 'json',

});

export const store = createStore(
    rootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            axiosMiddleware(client),
            thunkMiddleware,
            loggerMiddleware,
        )
    )
);
