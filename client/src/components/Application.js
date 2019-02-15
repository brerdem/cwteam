import React, {Component, Fragment} from 'react';
import Users from "./pages/Users";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import UserDetail from "./pages/UserDetail";
import Tasks from "./pages/Tasks";
import {Switch} from 'react-router-dom';
import PropsRoute from "./PropsRoute";
import {store} from "../helpers/store";
import Pusher from "pusher-js";
import {doLogin, doLogout} from "../actions/auth";
import {getAllUsers} from "../actions/user";
import {getAllProjects} from "../actions/project";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withSnackbar} from 'notistack';
import ReactNotifications from 'react-browser-notifications';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {getAllTasks} from "../actions/task";

const PUSHER_APP_KEY = '8042ee8184c51b5ff049';
const PUSHER_APP_CLUSTER = 'eu';

class Application extends Component {

    state = {
        loading: true,
        socketId: null,
        notifTitle: '',
        notifBody: '',
        notifIcon: 'cwteam_logo'

    };

    showNotifications() {
        // If the Notifications API is supported by the browser
        // then show the notification
        if (this.n.supported()) this.n.show();
    }

    addTaskDispatch = ({task, assignees, owner}) => {
        console.log('add task dispatch ---->', task);
        assignees.forEach(a => {
            if (a.user._id === this.props.auth.user._id) {

                this.props.enqueueSnackbar(owner.name + ', sana bir iş atadı.', {
                    variant: 'warning'
                });
                this.setState({
                    notifTitle: 'Yeni İş!',
                    notifBody: owner.name + ', sana bir iş atadı.',
                    notifIcon: owner.avatar_url ? owner.avatar_url : 'cwteam_logo'
                }, () => this.showNotifications());

            }
        });
        task.owner = owner;
        task.assignees = assignees;
        store.dispatch({type: 'ADD_TASK_DONE', data: task});

    };

    updateTaskDispatch = (payload) => {
        console.log('update task dispatch ---->', payload);
        const {task, start, finish} = payload;
        task.assignees.forEach(a => {
            if (a.user._id === this.props.auth.user._id) {
                this.props.enqueueSnackbar(`Sana ait bir iş "${start}" kategorisinden "${finish}" kategorisine taşındı.`, {
                    variant: 'warning'
                });
                this.setState({
                    notifTitle: 'İş Durumu Değişti!',
                    notifBody: `Sana ait bir iş "${start}" kategorisinden "${finish}" kategorisine taşındı.`,
                    notifIcon: task.owner.avatar_url ? task.owner.avatar_url : 'cwteam_logo'
                }, () => this.showNotifications());
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
        const {getAllProjects, getAllUsers, getAllTasks} = this.props;

        Promise.all([getAllProjects(), getAllUsers(), getAllTasks()]).then(() => {
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

        const {auth, projects, users, tasks} = this.props;
        const {loading, socketId} = this.state;

        return (
            <Fragment>
                <Loading show={loading} color="white"/>;


                <ReactNotifications
                    onRef={ref => (this.n = ref)} // Required
                    title={this.state.notifTitle} // Required
                    body={this.state.notifBody}
                    icon={`https://www.clockwork.com.tr/mailing/cwteam/users/${this.state.notifIcon}.png`}
                    tag="abcdef"
                    timeout="5000"

                />

                {!loading &&

                <div>


                    <Switch>
                        <PropsRoute exact path='/projects' loading={loading} component={Projects}
                                    auth={auth} projects={projects} users={users}/>
                        <PropsRoute exact path='/' component={Home} auth={auth} tasks={tasks} projects={projects} />
                        <PropsRoute path='/tasks' component={Tasks} auth={auth}

                                    loading={loading} socket_id={socketId}/>
                        <PropsRoute path='/users' component={Users} users={users} auth={auth}
                        />
                        <PropsRoute path='/user/detail/:id' component={UserDetail} auth={auth} users={users}
                                    loading={loading}/>
                    </Switch>

                </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        projects: state.projects,
        users: state.users,
        tasks: state.tasks,

    };
};

export default compose(
    connect(mapStateToProps, {doLogout, doLogin, getAllProjects, getAllUsers, getAllTasks}),
    withSnackbar
)(Application);

