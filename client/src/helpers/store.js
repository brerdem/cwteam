import {applyMiddleware, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from "../reducers";
import history from '../helpers/history'
import {routerMiddleware} from "connected-react-router";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {getToken} from "../actions/auth";


const loggerMiddleware = createLogger();

//todo remove localhost on production
const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://localhost:3000/api',
    responseType: 'json',
    headers: { 'Authorization': 'bearer '+ getToken() }
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
