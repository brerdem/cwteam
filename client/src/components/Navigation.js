import React, {Component} from 'react';
import classNames from "classnames";
import menuContent from "../helpers/menu";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import Divider from "@material-ui/core/es/Divider/Divider";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import LoginGroup from "./LoginGroup";
import {withStyles} from "@material-ui/core/styles";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Icon from "@material-ui/core/es/Icon/Icon";
import MenuIcon from '@material-ui/icons/Menu';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

});

class Navigation extends Component {

    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleMenuButton = param => () => {
        this.props.history.push(param);
    };

    handleLogout = () => {

        this.props.history.push('/login');
        this.props.doLogout();
    };

    render() {

        const {auth, classes, theme} = this.props;

        return (
            <div>

                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <Grid container justify="flex-start" direction="row" alignItems="center">

                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                CW Team </Typography>

                            {auth.isLoggedIn && <LoginGroup auth={auth}/>}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button key={'Home'} onClick={this.handleMenuButton('/')}>
                            <ListItemIcon><Icon>home</Icon></ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        {menuContent.map(item => (
                            <ListItem button key={item.title} onClick={this.handleMenuButton(item.link)}>
                                <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>

                        <ListItem button key="Ayarlar" onClick={this.handleMenuButton('/settings')}>
                            <ListItemIcon><Icon>settings</Icon></ListItemIcon>
                            <ListItemText primary="Ayarlar"/>
                        </ListItem>
                        <ListItem button key="Çıkış" onClick={this.handleLogout}>
                            <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
                            <ListItemText primary="Çıkış"/>
                        </ListItem>

                    </List>
                </Drawer>

            </div>
        );
    }
}

export default compose(
    withStyles(styles, {withTheme: true}),
    withRouter
)(Navigation);
