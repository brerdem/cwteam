import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Delete from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button";
import {push} from 'connected-react-router';
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

class Projects extends Component {
    state = {
        projects: this.props.projects,
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
      this.props.deleteProject(this.state.deleteProjectId).then(response => {
          this.closeDeleteDialog();
      }).catch(err => {
          console.log(err);
      });
    };


    componentDidMount() {

        this.props.enqueueSnackbar('12 işin bitiş tarihi gelmek üzere', {
            variant: 'warning'
        });

        this.props.getAllProjects().then((response) => this.setState({projects: response.payload.data, loading: false}))


    }

    render() {

        const {classes, addProject, getAllUsers, projects} = this.props;


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

                                  <Grid container justify={"flex-end"}> <IconButton size="small" color="primary" id={project._id} onClick={this.handleProjectDeleteDialog}>
                                        <Delete />
                                    </IconButton>
                                  </Grid>


                                </CardActions>
                            </Card>
                        </Grid>
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
                            <Button onClick={this.handleAlertClose} color="primary">
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


                <ProjectDialog open={this.state.open} onClose={this.closeDialog} addProject={addProject}
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
    connect(mapStateToProps, {push, getAllUsers, addProject, deleteProject, getAllProjects}),
    withStyles(theme),
    withSnackbar
)(Projects);


