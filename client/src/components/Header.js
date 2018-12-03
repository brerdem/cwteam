import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import {compose} from 'recompose';
import LogoutButton from "./auth/LogoutButton";


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
                    <Icon>people</Icon>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        CW Team
                    </Typography>



                    <Button color="primary" variant="outlined" href="https://www.basecamp.com" className={classes.leftIcon}>
                        <Icon className={classes.leftIcon}>launch</Icon>
                        BASECAMP'E GİT
                    </Button>

                    <LogoutButton logout="/" history={this.props.history} />

                </Toolbar>
            </AppBar>
        );
    }


}

export default compose(
    withStyles(styles)
)(Header);



