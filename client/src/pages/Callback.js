import React, {Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import {getParameterByName} from '../helpers/utils'
import basecamp from "../helpers/auth";
import {connect} from "react-redux";

let access_token, refresh_token, expires_in = '';

class Callback extends Component {

    state = {
        isTokenSet: false,

    };

    componentDidMount() {

        const values = queryString.parse(this.props.location.search);

        if (values && values.code) {
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
        }

        if (window.location.hash) {
            //todo convert to explicit grant
            console.log('hash called');
            access_token = getParameterByName('access_token');
            expires_in = (Date.now() / 1000 + parseInt(getParameterByName('expires_in'))).toString();
            refresh_token = getParameterByName('refresh_token');
            //const token_info = {access_token, expires_in, refresh_token};
            localStorage.setItem('id_token', access_token);
            this.setState({isTokenSet: true}, function () {
                this.getUserInfo();
            });

        }

    }

    getUserInfo() {
        // Saves user token to localStorage

        if (this.state.isTokenSet) {
            this.props.authenticate();
            axios.post('/api/auth/save_token', {
                access_token: access_token

            }).then((response) => {
                //todo get info about es6 promise calls
                console.log(response);
                this.logIn();

            }).catch(function (error) {
                console.log('error from axios write auth:' + error);

            });
        }

    };

    logIn = () => {

        this.props.getUser();
    };

    render() {
        return (

            <h3 style={{textAlign: 'center'}}>Başarıyla giriş yaptınız, anasayfaya yönlendiriliyorsunuz...</h3>
        )
    }

}

export default connect()(Callback);


