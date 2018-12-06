import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import LoginGroup from "./auth/LoginGroup";
import IconButton from "@material-ui/core/es/IconButton/IconButton";


const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        padding: theme.spacing.unit * 2,
        flex: 1,
    },

    leftIcon: {
        marginRight: theme.spacing.unit,
    },

});


class Header extends Component {


    render() {
        const {classes} = this.props;

        return (

            <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                    <IconButton href="/dashboard">
                        <Icon>people</Icon>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        CW Team
                    </Typography>
                    <LoginGroup logout="/" history={this.props.history}/>

                </Toolbar>
            </AppBar>
        );
    }


}

export default withStyles(styles)(Header);



