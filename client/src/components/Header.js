import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import LoginGroup from "./auth/LoginGroup";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: blue[500]


    },
    toolbarTitle: {
        padding: theme.spacing.unit * 2,
        flex: 1,
    },

    leftIcon: {
        marginRight: theme.spacing.unit,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    whiteColor: {
        color: theme.palette.common.white
    }


});


class Header extends Component {


    render() {
        const {classes} = this.props;

        return (

            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton href="/dashboard" className={classes.whiteColor}>
                        <Icon>people</Icon>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        CW Team
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Ara…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <LoginGroup logout="/" history={this.props.history}/>

                </Toolbar>
            </AppBar>
        );
    }


}

export default withStyles(styles)(Header);



