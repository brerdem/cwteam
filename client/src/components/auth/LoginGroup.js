import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import withAuth from "./withAuth";
import { withSnackbar } from 'notistack';
import AuthService from "./AuthService";
import {withStyles} from '@material-ui/core/styles';
import {compose} from "recompose";
import theme from "../Styles";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";



const Auth = new AuthService();




class LoginGroup extends Component {


    componentDidMount() {
        const {enqueueSnackbar} = this.props;

        enqueueSnackbar(this.props.user.identity.first_name+' '+this.props.user.identity.last_name+' olarak bağlısınız.', {
            variant: 'success'
        });
    }

    render() {

        const {classes} = this.props;

        return (


            <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.headerRightGrid}>

                <Button color="primary" variant="outlined" href="https://www.basecamp.com" className={classes.leftIcon}>
                    <Icon className={classes.leftIcon}>launch</Icon>
                    BASECAMP'E GİT
                </Button>
                <Avatar className={classes.avatar}>{this.props.inits}</Avatar>
                <IconButton className={classes.leftIcon} onClick={this.handleLogout} aria-label="Çıkış">
                    <Icon>exit_to_app</Icon>
                </IconButton>
            </Grid>

        )
    }

    handleLogout = () => {
        Auth.logout();
        this.props.history.push("/");
    }

}


LoginGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
    withAuth,
    withSnackbar,
    withStyles(theme)
)(LoginGroup)
