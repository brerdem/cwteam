import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import BasecampCallback from "./pages/BasecampCallback";
import Dashboard from "./pages/Home";
import Todos from "./pages/Todos";


class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/projects' component={Projects}/>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path='/todos' component={Todos}/>
                    <Route exact path='/callback' component={BasecampCallback}/>
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}
export default App;
