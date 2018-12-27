import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {push} from 'connected-react-router';
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import {DateTimePicker} from "material-ui-pickers";
import {connect} from "react-redux";
import {compose} from 'recompose';
import theme from '../components/styles/Styles';
import {withStyles} from '@material-ui/core';
import {withSnackbar} from 'notistack';
import PropTypes from 'prop-types';


const style = {

    dialog: {
        padding: 0,
        margin: 0
    },
    dialogContent: {
        paddingTop: 0,
        margin: 0
    },

    dialogTitle: {
        padding: '0px 24px',

    },

    titleText: {

        padding: 0,
        width: 300

    },
    descriptionText: {

        padding: 0,
        width: 300

    },


    titleTextInput: {
        style: {
            fontSize: 24,
        }

    }
};


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

        axios.get('/api/projects').then((response) => {
            console.log(response);

            this.setState({
                loading: false,
                projects: response.data
            })


        }).catch((error) => {

        });


        this.props.enqueueSnackbar('12 işin bitiş tarihi gelmek üzere', {
            variant: 'warning'
        });


    }

    render() {

        const {classes} = this.props;
        const {selectedDate, projects} = this.state;

        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            if (this.state.projects.length === 0) {
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

                <Dialog
                    onClose={this.closeDialog}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                    style={style.dialog}

                >


                    <DialogContent style={style.dialogContent}>
                        <Grid container direction="column" alignItems="flex-start">


                            <TextField
                                id="project-name"
                                placeholder="Proje İsmi"
                                margin="normal"
                                InputLabelProps={style.titleTextInput}
                                inputProps={style.titleTextInput}
                                fullWidth

                            />
                            <TextField
                                id="project-description"
                                placeholder="Proje Açıklaması"
                                margin="dense"
                                fullWidth
                            />
                        </Grid>


                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Başlangıç:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange}/>
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Bitiş:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange}/>
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="center" spacing={16}>
                            <Grid item>
                                <b>Efor (saat):</b>
                            </Grid>

                            <Grid item>
                                <TextField
                                    id="Number"
                                    type="number"
                                    defaultValue="1"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 1,
                                    }}
                                />
                            </Grid>

                        </Grid>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            VAZGEÇ
                        </Button>
                        <Button onClick={this.closeDialog} color="primary">
                            KAYDET
                        </Button>
                    </DialogActions>
                </Dialog>


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

export default compose(
    connect(null, {push}),
    withStyles(theme),
    withSnackbar
)(Projects);
