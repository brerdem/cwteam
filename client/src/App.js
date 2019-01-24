import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import LoginGroup from "./components/LoginGroup";
import Grid from "@material-ui/core/es/Grid/Grid";
import menuContent from './helpers/menu'
import Icon from "@material-ui/core/es/Icon/Icon";
import {push} from 'connected-react-router';
import Library from "./pages/Library";
import Accounting from "./pages/Accounting";
import Passwords from "./pages/Passwords";
import Settings from "./pages/Settings";
import {withSnackbar} from 'notistack';
import UserDetail from "./components/user/UserDetail";
import ZReport from "./pages/ZReport";
import ReactNotifications from 'react-browser-notifications';

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
        open: false,
        socketId: null,
        notifTitle: '',
        notifBody: '',
        notifIcon: 'cwteam_logo'

    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleMenuButton = param => () => {
        this.props.push(param);
    };

    handleLogout = () => {

        this.props.push('/login');
        this.props.doLogout();
    };

    showNotifications() {
        // If the Notifications API is supported by the browser
        // then show the notification
        if(this.n.supported()) this.n.show();
    }


    addTaskDispatch = ({insertedTask, project_id}) => {
        console.log('add task dispatch ---->', insertedTask, project_id);
        insertedTask.assignees.forEach(a => {
            if (a.user._id === this.props.auth.user._id) {

                this.props.enqueueSnackbar(insertedTask.owner.name + ', sana bir iş atadı.', {
                    variant: 'warning'
                });
                this.setState({notifTitle: 'Yeni İş!', notifBody: insertedTask.owner.name + ', sana bir iş atadı.', notifIcon:  insertedTask.owner.avatar_url ?  insertedTask.owner.avatar_url : 'cwteam_logo'}, () => this.showNotifications());

            }
        });
        store.dispatch({type: 'ADD_TASK_DONE', insertedTask, project_id});

    };

    updateTaskDispatch = (payload) => {
        console.log('update task dispatch ---->', payload);
        const {task, start, finish} = payload;
      task.assignees.forEach(a => {
            if (a.user._id === this.props.auth.user._id) {
                this.props.enqueueSnackbar(`Sana ait bir iş "${start}" kategorisinden "${finish}" kategorisine taşındı.`, {
                    variant: 'warning'
                });
                this.setState({notifTitle: 'İş Durumu Değişti!', notifBody: `Sana ait bir iş "${start}" kategorisinden "${finish}" kategorisine taşındı.`, notifIcon:  task.owner.avatar_url ?  task.owner.avatar_url : 'cwteam_logo'}, () => this.showNotifications());
            }
        });
       store.dispatch({type: 'REORDER_TASK_DONE', payload});

    };

    addProjectDispatch = project => {

        store.dispatch({type: 'ADD_PROJECT_DONE', project});

    };

    deleteProjectDispatch = id => {

        store.dispatch({type: 'DELETE_PROJECT_DONE', id});

    };




    componentDidMount() {
        const {getAllProjects, getAllUsers} = this.props;

        Promise.all([getAllProjects(), getAllUsers()]).then(response => {
            this.setState({loading: false});
        }).catch(err => {
            console.log(err);
        });

        this.pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
            useTLS: true,
        });


        this.pusher.connection.bind('connected', () => {
            this.setState({socketId: this.pusher.connection.socket_id});
        });

        this.channel = this.pusher.subscribe('projects');
        this.channel.bind('project_added', this.addProjectDispatch);
        this.channel.bind('project_deleted', this.deleteProjectDispatch);
        this.channel.bind('task_added', this.addTaskDispatch);
        this.channel.bind('task_updated', this.updateTaskDispatch);
    }

    render() {

        const {auth, doLogin, ui, projects, users, classes, theme} = this.props;
        return (
            <Fragment>
            <ReactNotifications
                onRef={ref => (this.n = ref)} // Required
                title={this.state.notifTitle} // Required
                body={this.state.notifBody}
                icon={`https://www.clockwork.com.tr/mailing/users/${this.state.notifIcon}.png`}
                tag="abcdef"
                timeout="5000"

            />

            <div className={classes.root}>
                <Fragment>
                    <CssBaseline/>
                    {!ui.isGanttFullscreen &&

                    <div>
                        {auth.isLoggedIn &&
                        <Fragment>
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
                        </Fragment>
                        }
                    </div>
                    }
                    <main className={classes.content}>
                        <Switch>
                            <Route exact path='/login' render={props => <Login doLogin={doLogin} {...props} />}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/library' component={Library}/>
                            <Route exact path='/accounting' component={Accounting}/>
                            <Route exact path='/passwords' component={Passwords}/>
                            <Route exact path='/settings' component={Settings}/>
                            <PrivateRoute exact path='/projects' loading={this.state.loading} component={Projects}
                                          auth={auth} projects={projects} users={users}/>
                            <PrivateRoute exact path='/' component={Home} auth={auth} projects={projects}/>
                            <PrivateRoute path='/tasks' component={Tasks} auth={auth} projects={projects} users={users}
                                          loading={this.state.loading} socket_id={this.state.socketId}/>
                            <PrivateRoute path='/users' component={Users} users={users} auth={auth} loading={this.state.loading}/>
                            <PrivateRoute path='/user/detail/:id' component={UserDetail} auth={auth} users={users} loading={this.state.loading}/>
                            <Route path='/z-report' component={ZReport} loading={this.state.loading}/>

                        </Switch>
                    </main>

                </Fragment>
            </div>
            </Fragment>
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
        {doLogout, doLogin, getAllProjects,getAllUsers, push},
        null,
        {
            pure: false,
            areStatesEqual: (next, prev) => {
                return next.auth === prev.auth
            }
        }
    ),
    withStyles(styles, {withTheme: true}),
    withSnackbar
)(App);

