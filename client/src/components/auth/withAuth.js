import React, {Component} from 'react';
import AuthService from './AuthService';


export default function withAuth(AuthComponent) {
    // Code here now
    const Auth = new AuthService();

    return class AuthWrapped extends Component {

        constructor(props) {
            super(props);
            this.state = {
                user: null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.sendToHome();
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    this.setState({
                        user: profile
                    })
                }
                catch (err) {
                    Auth.logout();
                    this.sendToHome();
                }
            }
        }

        render() {
            if (Auth.loggedIn()) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user}/>
                )
            }
            else {
                return null
            }
        }

        sendToHome = () => {

        };

    }

}
