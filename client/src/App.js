import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Callback from "./pages/Callback";
import Dashboard from "./pages/Home";
import Todos from "./pages/Todos";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import {authenticate, doLogout, getUser} from "./actions/auth";
import PrivateRoute from './components/PrivateRoute'
import Users from "./pages/Users";
import Register from "./pages/Register";



const App = ({auth, doLogout, getUser, authenticate, ui}) => (

    <React.Fragment>
        <CssBaseline/>
        {!ui.isGanttFullscreen &&
        <Header doLogout={doLogout} auth={auth}/>
        }
        <div>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <PrivateRoute exact path='/projects' component={Projects} auth={auth}/>
                <PrivateRoute exact path='/' component={Dashboard} auth={auth}/>
                <PrivateRoute path='/todos' component={Todos} auth={auth}/>
                <PrivateRoute path='/users' component={Users} auth={auth}/>
                <Route exact path='/callback'
                       render={(props) => (<Callback getUser={getUser} authenticate={authenticate} {...props} />)}/>
            </Switch>
        </div>

    </React.Fragment>

);


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        ui: state.ui

    };
};


export default connect(
    mapStateToProps,
    {doLogout, getUser, authenticate},
    null,
    {
        pure: false,
        areStatesEqual: (next, prev) => {
            return next.auth === prev.auth
        }
    }
)(App);

