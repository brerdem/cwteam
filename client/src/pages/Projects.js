import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Delete from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import {connect} from "react-redux";
import {compose} from 'recompose';
import theme from '../components/styles/Styles';
import {withStyles} from '@material-ui/core';
import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import ProjectDialog from "../components/project/ProjectDialog";
import {addProject, deleteProject, getAllProjects} from "../actions/project";
import {getAllUsers} from "../actions/user";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Pusher from 'pusher-js';
import axios from "axios";
import {getToken} from "../actions/auth";
import Fade from "@material-ui/core/Fade/Fade";

const PUSHER_APP_KEY = '8042ee8184c51b5ff049';
const PUSHER_APP_CLUSTER = 'eu';
const API_URL = 'http://localhost:3000/api';


//todo make alert dialogs as a new component

class Projects extends Component {

    state = {

        labelWidth: 0,
        loading: true,
        open: false,
        alertOpen: false,
        deleteProjectId: '',
        selectedDate: new Date()
    };

    openDialog = () => {
        this.setState({
            open: true,
        });
    };

    closeDialog = () => {
        this.setState({open: false});
    };

    closeDeleteDialog = () => {
        this.setState({alertOpen: false});
    };

    handleProjectDeleteDialog = (e) => {
        this.setState({
            alertOpen: true,
            deleteProjectId: e.currentTarget.id
        });
    };
    handleProjectDelete = () => {
        axios.post(API_URL + '/project/delete', {id: this.state.deleteProjectId}, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(response => {
                this.closeDeleteDialog()
            })
            .catch(error => {
                console.log(error);
            });

    };

    handleProjectAdd = (data) => {

        axios.post(API_URL + '/project/add', data, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(response => {
                this.closeDialog()
            })
            .catch(error => {
                console.log(error);
            });

    };

    componentDidMount() {

        this.pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
            useTLS: true,
        });

        this.channel = this.pusher.subscribe('projects');
        this.channel.bind('inserted', this.props.addProject);
        this.channel.bind('deleted', this.props.deleteProject);

        this.props.enqueueSnackbar('12 işin bitiş tarihi gelmek üzere', {
            variant: 'warning'
        });

        this.props.getAllProjects().then((response) => this.setState({projects: response.payload.data, loading: false}))

    }

    componentWillUnmount() {

        this.pusher.unsubscribe('projects');

    }

    render() {

        const {classes, getAllUsers, projects} = this.props;

        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            if (projects.length === 0) {
                content =
                    <Typography component="h4" variant="h6" color="error">Herhangi bir proje bulunmamakta</Typography>
            } else {

                content = <Grid container spacing={40}>
                    {projects.map(project => (
                        <Fade in={true} timeout={1000}>

                        <Grid item key={project._id} xs={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                                        {project.title}
                                    </Typography>
                                    <Typography>
                                        {project.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                    <Grid container justify={"flex-end"}> <IconButton size="small" color="primary"
                                                                                      id={project._id}
                                                                                      onClick={this.handleProjectDeleteDialog}>
                                        <Delete/>
                                    </IconButton>
                                    </Grid>


                                </CardActions>
                            </Card>
                        </Grid>

                        </Fade>
                    ))
                    }

                    <Dialog
                        open={this.state.alertOpen}
                        onClose={this.closeDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Silmek istediğinize emin misiniz?"}</DialogTitle>

                        <DialogActions>
                            <Button onClick={this.closeDialog} color="primary">
                                VAZGEÇ
                            </Button>
                            <Button onClick={this.handleProjectDelete} color="primary" autoFocus>
                                SİL
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

            }

        }

        return (
            <div>


                <ProjectDialog open={this.state.open} addProject={this.handleProjectAdd}
                               getAllUsers={getAllUsers}/>

                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="primary"
                                    className={classes.headingPadding}>
                            PROJELER
                        </Typography>
                        {content}

                    </div>

                    <Fab color="primary" onClick={this.openDialog} className={classes.fabButton}>
                        <Add/>

                    </Fab>


                </main>
            </div>

        )
    }
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    };
};

export default compose(
    connect(mapStateToProps, {getAllUsers, addProject, deleteProject, getAllProjects}),
    withStyles(theme),
    withSnackbar
)(Projects);


