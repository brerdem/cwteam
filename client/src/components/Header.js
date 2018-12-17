import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
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


const styles = theme => ({

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


    render() {
        const {classes, auth} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);


        return (

            <AppBar position="sticky">
                <Toolbar>
                    <IconButton href="/dashboard" className={classes.whiteColor}>
                        <Icon>people</Icon>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        CW Team
                    </Typography>

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


                    <Grid container direction="row" justify="flex-end" alignItems="center"
                          className={classes.headerRightGrid}
                          spacing={16}>

                        <Button color="inherit" variant="outlined" href="https://www.basecamp.com" target="_blank"
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
                                <Avatar className={classes.avatar}>BE</Avatar>
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
                        </div>

                        }

                    </Grid>

                </Toolbar>
            </AppBar>
        );
    }

    handleLogout = () => {
        this.setState({anchorEl: null});
        this.props.doLogout();
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

}

export default withStyles(styles)(Header);



