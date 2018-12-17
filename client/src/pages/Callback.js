import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {getParameterByName} from '../helpers/utils'
import basecamp from "../helpers/auth";


const Callback = function (props) {




    const values = queryString.parse(props.location.search);

    console.log(values.code);// "top"
    axios.post(basecamp.tokenHost, {
        type: 'user_agent',
        code: values.code,
        client_id: basecamp.client_id,
        client_secret: basecamp.client_secret,
        redirect_uri: basecamp.redirect_uri

    })
        .then(function (response) {
            return null;


        })
        .catch(function (error) {
            console.log('error from axios:' + error);

        });


    const setTokenFromHash = () =>
    {
        if (window.location.hash) {
            const access_token = getParameterByName('access_token');
            const expires_in = (Date.now() / 1000 + parseInt(getParameterByName('expires_in'))).toString();
            const refresh_token = getParameterByName('refresh_token');
            const token_info = {access_token, expires_in, refresh_token};
            setToken(JSON.stringify(token_info));
            //todo shorthand for axios
            axios.post('/api/auth/save_token', {
                access_token: access_token,
                expires_in: expires_in,
                refresh_token: refresh_token

            }).then((response) => {
                //todo get info about es6 promise calls
                console.log(response);
                logIn();


            }).catch(function (error) {
                console.log('error from axios write auth:' + error);

            });


        }

    };


    const setToken = (idToken) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        console.log(idToken);
    };

    const logIn = () => {
        props.doLogin();
        props.history.push('/');
    };
    setTokenFromHash();

    return (

        <h3 style={{textAlign: 'center'}}>Başarıyla giriş yaptınız, anasayfaya yönlendiriliyorsunuz...</h3>
    );


}
export default Callback;


