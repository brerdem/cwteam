import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Callback from "./pages/Callback";
import Dashboard from "./pages/Home";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import {doLogout, doLogin} from "./actions/auth"



const App = ({auth, doLogout, doLogin}) => (
    <React.Fragment>
        <CssBaseline/>
        <Header doLogout={doLogout} auth={auth} />
        <div>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <PrivateRoute exact path='/projects' component={Projects} auth={auth}/>
                <PrivateRoute exact path='/' component={Dashboard} auth={auth}/>
                <PrivateRoute path='/todos' component={Todos} auth={auth}/>
                <Route exact path='/callback' render={(props) => (<Callback doLogin={doLogin} {...props}/>)} />
            </Switch>
        </div>
    </React.Fragment>
);


const mapStateToProps = state => ({
     auth: state.auth
});

export default connect(
    mapStateToProps,
    {doLogout, doLogin},
)(App);

