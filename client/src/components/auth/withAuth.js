import React, {Component} from 'react';
import AuthService from './AuthService';
import axios from "axios/index";



export default function withAuth(AuthComponent) {

    const Auth = new AuthService();

    return class AuthWrapped extends Component {

        state = {
            user: null
        }

        componentDidMount() {


            if (!Auth.loggedIn()) {
                this.sendToHome();
            }
            else {
                try {

                    axios.post('/api/auth', {
                        access_token: JSON.parse(localStorage.getItem('id_token')).access_token
                    })
                        .then((response) => {
                            this.setState({
                                user: response.data
                            })

                        })
                        .catch(function (error) {

                            console.log('error from api/auth:' + error);

                        });


                }
                catch (err) {
                    Auth.logout();
                    this.sendToHome();
                }
            }
        }

        render() {


            if (this.state.user) {

                return (

                    <AuthComponent history={this.props.history} user={this.state.user}
                                   inits={this.state.user.identity.first_name.charAt(0).toLocaleUpperCase() + this.state.user.identity.last_name.charAt(0).toLocaleUpperCase()}/>
                )
            }
            else {
                return null
            }
        }


    }


    // Code here now


}

