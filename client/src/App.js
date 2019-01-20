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

const PUSHER_APP_KEY = '8042ee8184c51b5ff049';
const PUSHER_APP_CLUSTER = 'eu';

class App extends Component {

    state = {
        loading: true
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

        const {auth, doLogout, doLogin, ui, projects, users} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                {!ui.isGanttFullscreen &&
                <Header doLogout={doLogout} auth={auth}/>
                }
                <div>
                    <Switch>
                        <Route exact path='/login' render={props => <Login doLogin={doLogin} {...props} />}/>
                        <Route exact path='/register' component={Register}/>
                        <PrivateRoute exact path='/projects' loading={this.state.loading} component={Projects}
                                      auth={auth} projects={projects} users={users} />
                        <PrivateRoute exact path='/' component={Home} auth={auth} projects={projects}/>
                        <PrivateRoute path='/tasks' component={Tasks} auth={auth} projects={projects} users={users} loading={this.state.loading}/>
                        <PrivateRoute path='/users' component={Users} auth={auth} loading={this.state.loading}/>

                    </Switch>
                </div>

            </React.Fragment>
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

export default connect(
    mapStateToProps,
    {doLogout, doLogin, getAllProjects, addProject, deleteProject, getAllUsers},
    null,
    {
        pure: false,
        areStatesEqual: (next, prev) => {
            return next.auth === prev.auth
        }
    }
)(App);

