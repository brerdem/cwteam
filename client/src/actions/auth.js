import * as types from "./types";
import axios from "axios/index";
import { push } from 'connected-react-router'


const isTokenExpired = (token) => {
    try {

        return getExpireDate() < Date.now() / 1000;
    }
    catch (err) {
        return false;
    }
}


const loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = getToken(); // GEtting token from localstorage
    return !!token && !isTokenExpired(token) // handwaiving here
};

export const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
};

const getExpireDate = () => {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('id_token')).expires_in;
};

/*
const getRefreshToken = () => {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('id_token')).refresh_token;
};

*/






//action creators
const userLogout = () => ({
    type: types.AUTH_LOGOUT,
});

const authenticateUser = () => ({
    type: types.AUTH_AUTHENTICATED,
});


const userLogin = (user) => ({
    type: types.AUTH_LOGIN,
    user: user
});


export const doLogout = () => dispatch => {
    localStorage.removeItem('id_token');
    dispatch(userLogout());
};

export const authenticate = () => dispatch => {
    dispatch(authenticateUser());
};


export const getUser = () => dispatch => {
console.log('get user fired');
    axios.post('/api/auth', {
        access_token: getToken()
    })
        .then((response) => {

            if (response.data && loggedIn()){
                dispatch(userLogin(response.data));
                dispatch(push('/'));
            }

        })
        .catch(function (error) {

            console.log('error from api/auth:' + error);

        });



};


