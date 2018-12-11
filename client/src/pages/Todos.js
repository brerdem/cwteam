import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/styles/Styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ClearAll from '@material-ui/icons/ClearAll';
import axios from "axios/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Kanban from "../components/todo/Kanban";
import Timeline from "../components/todo/Timeline";
import {Link, Route, BrowserRouter, Switch} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import AppBar from "@material-ui/core/AppBar";




class Todos extends Component {
    state = {
        loading: true,
        value: ''
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


    };

    handleChange = (value) => {

        this.setState({
            value: value
        })
    };





    render() {
        const {classes} = this.props;
        const {value} = this.state;


        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =
                <BrowserRouter>
                    <div className={classes.todoTabContainer}>
                        <AppBar position="static" className={classes.root}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                fullWidth
                                indicatorColor="inherit"
                                textColor="inherit"
                            >
                                <Tab icon={<ViewWeek/>} label="KANBAN" component={Link} to="/todos/kanban"/>
                                <Tab icon={<ClearAll/>} label="TIMELINE" component={Link} to="/todos/timeline"/>

                            </Tabs>

                        </AppBar>
                        <Switch>
                            <Route path="/todos/kanban" render={() => <Kanban projects={this.state.projects}/>}/>
                            <Route path="/todos/timeline" render={() => <Timeline projects={this.state.projects}/>}/>
                        </Switch>

                    </div>
                </BrowserRouter>

        }

        return (
            <React.Fragment>
                <CssBaseline/>
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

            </React.Fragment>
        )
    }
}


Todos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(theme),
    withRouter
)(Todos);
