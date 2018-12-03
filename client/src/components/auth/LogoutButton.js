import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";
import withAuth from "./withAuth";
import AuthService from "./AuthService";
import {withStyles} from '@material-ui/core/styles';
import {compose} from "recompose";
import theme from "../Styles";
import PropTypes from 'prop-types';



const Auth = new AuthService();
class LogoutButton extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Button color="primary" variant="outlined" onClick={this.handleLogout}>
                <Icon className={classes.leftIcon}>exit_to_app</Icon>
                ÇIKIŞ
            </Button>
        );
    }

    handleLogout = () => {
        Auth.logout();
        console.log(this.props.history);
        this.props.history.push("/")
    }

}


LogoutButton.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
    withAuth,
    withStyles(theme)
)(LogoutButton)
