import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Callback from "./pages/Callback";
import Dashboard from "./pages/Home";
import Todos from "./pages/Todos";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import {authenticate, doLogout, getUser} from "./actions/auth";


const PrivateRoute = ({component: Component, auth, ...rest}) => (

    <Route
        {...rest}
        render={props =>

            auth.isLoggedIn ? (
                <Component auth={auth} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login"
                    }}

                />
            )
        }
    />
);


const App = ({auth, doLogout, getUser, authenticate}) => (

    <React.Fragment>
        <CssBaseline/>
        <Header doLogout={doLogout} auth={auth}/>
        <div>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact path='/projects' component={Projects} auth={auth}/>
                <PrivateRoute exact path='/' component={Dashboard} auth={auth}/>
                <PrivateRoute path='/todos' component={Todos} auth={auth}/>
                <Route exact path='/callback'
                       render={(props) => (<Callback getUser={getUser} authenticate={authenticate} {...props} />)}/>
            </Switch>
        </div>

    </React.Fragment>

);


const mapStateToProps = (state) => {
    return {
        auth: state.auth

    };
};


export default connect(
    mapStateToProps,
    {doLogout, getUser, authenticate},
    null,
    {
        pure: true,
        areStatesEqual: (next, prev) => {
            return next.auth === prev.auth
        }
    }
)(App);

