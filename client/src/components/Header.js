import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {compose} from 'recompose';
import {connect} from "react-redux";
import {push} from "connected-react-router";


const styles = theme => ({


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
        margin: '0 auto'


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
    },
    avatar: {
        color: '#203ac0',
        backgroundColor: '#fff'
    },


});


class Header extends Component {


    state = {
        anchorEl: null,
    };
    handleLogout = () => {
        this.setState({anchorEl: null});
        this.props.push('/login');
        this.props.doLogout();
    };
    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes, auth} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);


        return (

            <AppBar position="sticky">

                <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>

                            <Typography variant="h6" color="inherit" noWrap>
                                <IconButton href="/" className={classes.whiteColor}>
                                    <Icon>people</Icon>
                                </IconButton>
                                CW Team
                            </Typography>

                        </Grid>
                        <Grid item>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Ara…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Grid>


                        <Grid item>

                            <Grid container justify="flex-end" alignItems="center">

                                <Button color="inherit" variant="outlined" href="https://www.basecamp.com"
                                        target="_blank"
                                        className={classes.leftIcon}>
                                    <Icon className={classes.leftIcon}>launch</Icon>
                                    BASECAMP'E GİT
                                </Button>


                                {auth.isLoggedIn &&

                                <div><IconButton color="inherit">
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
                                        <Avatar className={classes.avatar}>{auth.user.first_name.charAt(0).toLocaleUpperCase()+auth.user.last_name.charAt(0).toLocaleUpperCase()}</Avatar>
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
                                            <ListItemText classes={{primary: classes.primary}} inset
                                                          primary="Profilim"/>
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
                                </div>

                                }


                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }

}

export default compose(
    withStyles(styles,
        {name: 'Header'}
    ),
    connect(null, {push})
)(Header)



