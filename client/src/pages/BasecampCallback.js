import React, {Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Utils from '../components/Utils'
import BasecampAuth from "../components/auth/BasecampAuth";
import AuthService from "../components/auth/AuthService";



const Auth = new AuthService();

export default class BasecampCallback extends Component {


    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        console.log(values.code);// "top"
        axios.post(BasecampAuth.credentials.tokenHost, {
            type: 'user_agent',
            code: values.code,
            client_id: BasecampAuth.credentials.client_id,
            client_secret: BasecampAuth.credentials.client_secret,
            redirect_uri: BasecampAuth.credentials.redirect_uri

        })
            .then(function (response) {
                console.log(response);


            })
            .catch(function (error) {
                console.log('error from axios:' + error);

            });


    }


    setTokenFromHash() {
        if (window.location.hash) {
            const access_token = Utils.getParameterByName('access_token');
            const expires_in = (Date.now() / 1000 + parseInt(Utils.getParameterByName('expires_in'))).toString();
            const refresh_token = Utils.getParameterByName('refresh_token');
            const token_info = {'access_token': access_token, 'expires_in': expires_in, 'refresh_token': refresh_token};
            Auth.setToken(JSON.stringify(token_info));
            this.props.history.push('/projects');

        }

    }


    render() {
        this.setTokenFromHash();

        return (
            <p>{Utils.getParameterByName('access_token')}</p>
        );
    }


}


