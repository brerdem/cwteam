import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import withAuth from "./withAuth";
import {withSnackbar} from 'notistack';
import AuthService from "./AuthService";
import {withStyles} from '@material-ui/core/styles';
import {compose} from "recompose";
import theme from "../styles/Styles";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


const Auth = new AuthService();

class LoginGroup extends Component {


    state = {
        anchorEl: null,
    };

    componentDidMount() {
        const {enqueueSnackbar} = this.props;

        enqueueSnackbar(this.props.user.identity.first_name + ' ' + this.props.user.identity.last_name + ' olarak bağlısınız.', {
            variant: 'success'
        });
    }

    render() {

        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (


            <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.headerRightGrid}
                  spacing={16}>

                <Button color="primary" variant="contained" href="https://www.basecamp.com" target="_blank"
                        className={classes.leftIcon}>
                    <Icon className={classes.leftIcon}>launch</Icon>
                    BASECAMP'E GİT
                </Button>
                <IconButton color="inherit">
                    <Badge className={classes.margin} badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>

                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <Avatar className={classes.avatar}>{this.props.inits}</Avatar>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>

                        <ListItemIcon className={classes.icon}>
                            <Icon>account_circle</Icon>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.primary}} inset primary="Profilim"/>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon className={classes.icon}>
                            <Icon>settings</Icon>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.primary}} inset primary="Ayarlar"/>

                    </MenuItem>

                    <MenuItem onClick={this.handleLogout}>
                        <ListItemIcon className={classes.icon}>
                            <Icon>exit_to_app</Icon>
                        </ListItemIcon>


                        <ListItemText classes={{primary: classes.primary}} inset primary="Çıkış"/>

                    </MenuItem>

                </Menu>
            </Grid>

        )
    }

    handleLogout = () => {
        this.setState({anchorEl: null});
        Auth.logout();
        this.props.history.push("/");
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

}


LoginGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
    withAuth,
    withSnackbar,
    withStyles(theme)
)(LoginGroup)
