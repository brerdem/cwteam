import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import {doLogin, doLogout} from "./actions/auth";
import PrivateRoute from './components/PrivateRoute'
import Users from "./pages/Users";
import Register from "./pages/Register";
import {addProject, deleteProject, getAllProjects} from "./actions/project";
import Pusher from "pusher-js";
import {store} from "./helpers/store";
import {getAllUsers} from "./actions/user";
import classNames from 'classnames';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import List from "@material-ui/core/List/List";
import {compose} from "recompose";
import {withStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

const PUSHER_APP_KEY = '8042ee8184c51b5ff049';
const PUSHER_APP_CLUSTER = 'eu';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
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
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class App extends Component {

    state = {
        loading: true,
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    //todo move initial data to components. Make another router group or HOC

    dispatchUpdate = ({item, project_id}) => {

        if (Object.keys(item)[0] === 'tasks.backlog') {
            console.log('dispatch:' + item);

            store.dispatch({type: 'ADD_TASK_DONE', item: item['tasks.backlog'], project_id});
        } else {

            store.dispatch({type: 'REORDER_TASK_SERVER', tasks: item.tasks, project_id});
        }

    };

    componentDidMount() {
        const {getAllProjects, getAllUsers, addProject, deleteProject} = this.props;

        Promise.all([getAllProjects(), getAllUsers()]).then(response => {
            this.setState({loading: false});
        }).catch(err => {
            console.log(err);
        });

        this.pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
            useTLS: true,
        });

        this.channel = this.pusher.subscribe('projects');
        this.channel.bind('updated', this.dispatchUpdate);
        this.channel.bind('inserted', addProject);
        this.channel.bind('deleted', deleteProject);
    }

    render() {

        const {auth, doLogout, doLogin, ui, projects, users, classes, theme} = this.props;
        return (

            <div className={classes.root}>
                <React.Fragment>
                    <CssBaseline/>
                    {!ui.isGanttFullscreen &&
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
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
                        </Toolbar>
                    </AppBar>

                    }
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
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <Switch>
                            <Route exact path='/login' render={props => <Login doLogin={doLogin} {...props} />}/>
                            <Route exact path='/register' component={Register}/>
                            <PrivateRoute exact path='/projects' loading={this.state.loading} component={Projects}
                                          auth={auth} projects={projects} users={users}/>
                            <PrivateRoute exact path='/' component={Home} auth={auth} projects={projects}/>
                            <PrivateRoute path='/tasks' component={Tasks} auth={auth} projects={projects} users={users}
                                          loading={this.state.loading}/>
                            <PrivateRoute path='/users' component={Users} auth={auth} loading={this.state.loading}/>

                        </Switch>
                    </main>

                </React.Fragment>
            </div>
        )

    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        ui: state.ui,
        projects: state.projects,
        users: state.users

    };
};

export default compose(
    connect(
        mapStateToProps,
        {doLogout, doLogin, getAllProjects, addProject, deleteProject, getAllUsers},
        null,
        {
            pure: false,
            areStatesEqual: (next, prev) => {
                return next.auth === prev.auth
            }
        }
    ), withStyles(styles, {withTheme: true})
)(App);

