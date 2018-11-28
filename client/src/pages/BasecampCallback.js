import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';

import axios from 'axios';
import Utils from '../components/Utils'
import BasecampAuth from "../components/auth/BasecampAuth";

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

    renderRedirect = (from) => {
        if (this.state.redirect) {
            return <Redirect to={from}/>
        }
    };




    render() {
        return (
            <p>{Utils.getParameterByName('access_token')}</p>
        );
    }

}


