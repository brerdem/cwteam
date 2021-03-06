import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import theme from "../styles/Styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewWeek from '@material-ui/icons/ViewWeek';
import ClearAll from '@material-ui/icons/ClearAll';
import GanttContainer from "../task/timeline/GanttContainer";
import AppBar from "@material-ui/core/AppBar";
import blue from '@material-ui/core/colors/blue';
import {connect} from "react-redux";
import {addTask, filterTaskByDepartments, getAllProjects} from "../../actions/project";
import {reorderTasks} from "../../actions/task";
import {compose} from 'recompose';
import Grid from "@material-ui/core/es/Grid/Grid";
import Project from "../task/kanban/Project";
import Board from "../task/kanban/Board";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import departments from '../../helpers/departments';
import _ from 'lodash';
import withLoading from "../withLoading";

const extraTheme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[200]
        }
    },

});

class Tasks extends Component {

    state = {

        value: this.props.location.pathname.match(/\/tasks\/kanban[/.*]?/) ? '/tasks/kanban' : '/tasks/timeline',
        software: true,
        design: true,
        account: true,
        social: true,

    };

    handleChange = (event, value) => {
        this.setState({value});
        this.props.history.push(value);

    };

    handleDepartmentChange = name => event => {
        this.setState({[name]: event.target.checked}, () => {
            this.props.filterTaskByDepartments(_.chain(departments).filter(t => this.state[t.def]).map('name').value());
        });
    };

    render() {
//todo render props düşünülebilir
        const {classes, projects, addTask, reorderTasks, auth, users, tasks, socket_id} = this.props;
        const {value} = this.state;

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

                        <div className={classes.todoTabContainer}>
                            <MuiThemeProvider theme={extraTheme}>
                                <AppBar position="static" color="primary" elevation={0}>

                                    <Tabs
                                        value={value}
                                        onChange={this.handleChange}
                                        fullWidth
                                        indicatorColor="secondary"
                                        textColor="inherit"
                                    >
                                        <Tab icon={<ViewWeek/>} label="KANBAN" value="/tasks/kanban"/>
                                        <Tab icon={<ClearAll/>} label="TIMELINE" value="/tasks/timeline"/>

                                    </Tabs>

                                </AppBar>
                            </MuiThemeProvider>
                            {value.match(/\/tasks\/kanban[.*]?/) &&
                            <Grid container spacing={24}>
                                <Grid item xs={12}>

                                    {projects.map((project, index) => {
                                        console.log('this.props.match.params -->', this.props);

                                        return <Project key={index} project={project}
                                                        tasks={tasks.filter(t => t.project_id === project._id)}
                                                        users={users}
                                                        edit={this.props.match.params.id === project._id}><Board
                                            tasks={tasks.filter(t => t.project_id === project._id)}
                                            project={project}
                                            auth={auth}
                                            addTask={addTask}
                                            reorderTasks={reorderTasks}
                                            socket_id={socket_id}
                                        /></Project>

                                    })}
                                </Grid>
                            </Grid>

                            }
                            {value === '/tasks/timeline' &&
                            <GanttContainer projects={projects} tasks={tasks}/>
                            }


                        </div>
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
        tasks: state.tasks,
        users: state.users,
        ui: state.ui,
    };
};

//fixme remove from connect
export default compose(
    connect(mapStateToProps, {getAllProjects, addTask, reorderTasks, filterTaskByDepartments}),
    withStyles(theme),
    withLoading
)(Tasks);
