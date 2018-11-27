import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import BasecampCallback from "./pages/BasecampCallback";

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/projects' component={Projects}/>
                    <Route path='/callback' component={BasecampCallback}/>
                </Switch>
            </div>
        )
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}
export default App;
