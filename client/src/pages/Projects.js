import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
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
import {store} from "../helpers/store";
import {addProject} from "../actions/projects";

class Projects extends Component {
    state = {
        project: '',
        projects: [],
        labelWidth: 0,
        loading: true,
        open: false,
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


    componentDidMount() {



        this.props.enqueueSnackbar('12 işin bitiş tarihi gelmek üzere', {
            variant: 'warning'
        });


    }

    render() {

        const {classes} = this.props;
        const {projects} = this.state;

        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            if (store.getState().projects.length === 0) {
                content =
                    <Typography component="h4" variant="h6" color="error">Herhangi bir proje bulunmamakta</Typography>
            } else {

                content = <Grid container spacing={40}>
                    {projects.map(project => (
                        <Grid item key={project.id} xs={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                                        {project.name}
                                    </Typography>
                                    <Typography>
                                        {project.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        SEÇ
                                    </Button>
                                    <Button size="small" color="secondary">
                                        SİL
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>

            }
        }


        return (
            <div>


                <ProjectDialog open={this.state.open} onClose={this.closeDialog} addProject={this.props.addProject} />

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
        project: state.project
    };
};

export default compose(
    connect(mapStateToProps, {push, addProject}),
    withStyles(theme),
    withSnackbar
)(Projects);
