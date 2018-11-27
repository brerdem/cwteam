import React, {Component} from 'react';
import {OauthReceiver} from "react-oauth-flow";
import { Redirect } from 'react-router-dom'

export default class BasecampCallback extends Component {

    constructor(props) {
        super(props);
        this.credentials = {
            client: {
                id: '5fccfc8fcf0fa68e8ceab31a5ed7422beb4e1f2b',
                secret: 'ffa278b2c0a9d6b8430b33758899a1f679f9eb04'
            },
            auth: {

                tokenHost: 'https://launchpad.37signals.com/',
                authorizePath: 'authorization/new',
                tokenPath: 'authorization/token'
            }
        };
        this.tokenObj = {method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}


    }
    renderRedirect = (from) => {
        if (this.state.redirect) {
            return <Redirect to={from} />
        }
    }


    handleSuccess = async (accessToken, {response, state}) => {
        console.log('Successfully authorized');
        //await setProfileFromDropbox(accessToken);
        await this.renderRedirect(state.from);
    };

    handleError = error => {
        console.error('An error occured');
        console.error(error.message);
    };

    render() {
        return (
            <OauthReceiver
                tokenUrl="https://launchpad.37signals.com/authorization/token?type=web_server"
                clientId={this.credentials.client.id}
                clientSecret={this.credentials.client.secret}
                redirectUri="https://cwteam.ngrok.io/callback"
                onAuthSuccess={this.handleSuccess}
                onAuthError={this.handleError}
                location=""
                tokenFetchArgs={this.tokenObj}
                render={({processing, state, error}) => (
                    <div>
                        {processing && <p>Authorization in progress</p>}
                        {state && <p>Will redirect you to {state.from}</p>}
                        {error && <p className="error">Error: {error.message}</p>}
                    </div>
                )}
            />
        );
    }

}


