import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import theme from "../styles/Styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ClearAll from '@material-ui/icons/ClearAll';
import CircularProgress from "@material-ui/core/CircularProgress";
import Timeline from "../task/Timeline";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import blue from '@material-ui/core/colors/blue';
import {connect} from "react-redux";
import {addTask, filterTaskByDepartments, getAllProjects, reorderTask} from "../../actions/project";
import {compose} from 'recompose';
import Grid from "@material-ui/core/es/Grid/Grid";
import Project from "../task/kanban/Project";
import Board from "../task/kanban/Board";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import departments from '../../helpers/departments';
import _ from 'underscore';

const extraTheme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[200]
        }
    },

});

class Tasks extends Component {

    state = {

        value: 0,
        software: true,
        design: true,
        account: true,
        social: true,

    };

    componentDidMount() {

        this.setState({
            value: this.props.location.pathname === '/todos/timeline' ? 1 : 0
        });

    };

    handleChange = (event, value) => {

        this.setState({value});
    };

    handleDepartmentChange = name => event => {
        this.setState({[name]: event.target.checked}, () => {
            this.props.filterTaskByDepartments(_.chain(departments).filter(t => this.state[t.def]).pluck('name').value());
        });
    };

    render() {

        const {classes, projects, addTask, reorderTask, auth, users, loading, socket_id} = this.props;
        console.log('auth is', auth);
        let content;
        if (loading) {
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
                                    <Tab icon={<ViewWeek/>} label="KANBAN" component={Link} to="/tasks/kanban"/>
                                    <Tab icon={<ClearAll/>} label="TIMELINE" component={Link} to="/tasks/timeline"/>

                                </Tabs>

                            </AppBar>
                        </MuiThemeProvider>
                        <Switch>
                            <Route path="/tasks/kanban/:project_id?" render={(props) =>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        {projects.map((project, index) => {

                                            return <Project key={index} project={project} users={users} edit={props.match.params.project_id === project._id}><Board
                                                project={project}
                                                auth={auth}
                                                addTask={addTask}
                                                reorderTask={reorderTask}
                                                socket_id={socket_id}
                                            /></Project>

                                        })}
                                    </Grid>
                                </Grid>

                            }/>
                            <Route path="/tasks/timeline"
                                   render={() => <Timeline projects={projects}/>}/>
                        </Switch>

                    </div>
                </BrowserRouter>

        }

        return (
            <div>

                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom
                                    className={classes.headingPadding}>
                            İŞLER
                        </Typography>

                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                <Grid container justify="center" alignItems="center" direction="row">
                                    {departments.map(department =>

                                        <FormControlLabel key={department.def}
                                                          control={
                                                              <Checkbox style={{color: department.color}}
                                                                        checked={this.state[department.def]}
                                                                        onChange={this.handleDepartmentChange(department.def)}
                                                                        value={department.def}/>
                                                          }
                                                          label={department.name}
                                        />
                                    )}
                                </Grid>
                            </FormGroup>
                        </FormControl>


                        {content}
                    </div>


                </main>

            </div>

        )
    }
}

Tasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return {
        projects: state.projects,
    };
};

//fixme remove from connect
export default compose(
    connect(mapStateToProps, {getAllProjects, addTask, reorderTask, filterTaskByDepartments}),
    withStyles(theme)
)(Tasks);
