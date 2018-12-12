import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/styles/Styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ClearAll from '@material-ui/icons/ClearAll';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import axios from "axios/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Kanban from "../components/todo/Kanban";
import Timeline from "../components/todo/Timeline";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import blue from '@material-ui/core/colors/blue';
import SpeedDial from '@material-ui/lab/SpeedDial';


const extraTheme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[200]
        }
    },


});


class Todos extends Component {
    state = {
        loading: true,
        value: 0,
        fullscreen: false
    };


    componentDidMount() {
        axios.post('/api/projects', {

            access_token: JSON.parse(localStorage.getItem('id_token')).access_token

        }).then((response) => {
            this.setState({
                projects: response.data,
                loading: false,

            })

        });
        this.setState({
            value: this.props.location.pathname === '/todos/timeline' ? 1 : 0
        })


    };

    handleChange = (event, value) => {

        this.setState({value})
    };

    handleClick = () => {
        this.setState({
            fullscreen: !this.state.fullscreen
        });
    };


    render() {
        const {classes} = this.props;

        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =
                <BrowserRouter>
                    <div className={classes.todoTabContainer}>
                        <MuiThemeProvider theme={extraTheme}>
                            <AppBar position="static" color="primary">


                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    fullWidth
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                >
                                    <Tab icon={<ViewWeek/>} label="KANBAN" component={Link} to="/todos/kanban"/>
                                    <Tab icon={<ClearAll/>} label="TIMELINE" component={Link} to="/todos/timeline"/>

                                </Tabs>


                            </AppBar>
                        </MuiThemeProvider>
                        <Switch>
                            <Route path="/todos/kanban" render={() => <Kanban projects={this.state.projects}/>}/>
                            <Route path="/todos/timeline"
                                   render={() => <Timeline projects={this.state.projects} height="500px"/>}/>
                        </Switch>

                    </div>
                </BrowserRouter>

        }

        return (
            <React.Fragment>
                <CssBaseline/>
                {!this.state.fullscreen &&
                <div>
                    <Header history={this.props.history}/>

                    <main className={classes.layout}>
                        {/* Hero unit */}
                        <div className={classes.heroContent}>
                            <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom
                                        className={classes.headingPadding}>
                                İŞLER
                            </Typography>
                            {content}


                        </div>


                    </main>
                </div>
                }

                {this.state.fullscreen &&
                <Timeline projects={this.state.projects} height="100vh"/>
                }

                {this.state.value === 1 &&
                <SpeedDial
                    ariaLabel="FullScreen"
                    icon={this.state.fullscreen ? <FullscreenExit/> : <Fullscreen/>}
                    onClick={this.handleClick}
                    open={false}
                    direction="left"
                    style={{margin: 30, position: 'fixed', bottom: 0, right: 0}}
                />
                }


            </React.Fragment>

        )
    }
}


Todos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Todos);
