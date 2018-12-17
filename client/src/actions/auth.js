import * as types from "./types";
import axios from "axios/index";


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

const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
};

const getExpireDate = () => {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('id_token')).expires_in;
};

const getRefreshToken = () => {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('id_token')).refresh_token;
};



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

export const doLogin = () => dispatch => {

    axios.post('/api/auth', {
        access_token: JSON.parse(getToken()).access_token
    })
        .then((response) => {
            if (response.data && loggedIn()) dispatch(userLogin(response.data));

        })
        .catch(function (error) {

            console.log('error from api/auth:' + error);

        });



};


