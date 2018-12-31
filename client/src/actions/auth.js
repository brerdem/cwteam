import * as types from "./types";
import jwt from "jsonwebtoken";

export const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token') || {}
};


//action creators
const userLogout = () => ({
    type: types.AUTH_LOGOUT,
});


const userLogin = (user) => ({
    type: types.AUTH_LOGIN,
    user: user
});


export const doLogout = () => dispatch => {
    localStorage.removeItem('id_token');
    dispatch(userLogout());
};

export const doLogin = (user, token) => dispatch => {
    localStorage.setItem('id_token', token);
    dispatch(userLogin(user));
};

export const checkLogin = () => dispatch => {
    const token = getToken();
    if (token) {
        const decoded = jwt.decode(token, {complete: true});
        dispatch(userLogin(decoded.payload));
    }


};




