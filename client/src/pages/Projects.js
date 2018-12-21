import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {withSnackbar} from 'notistack';
import {compose} from "recompose";
import { push } from 'connected-react-router';
import {connect} from "react-redux";





class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projects: [],
            labelWidth: 0,
            loading: true


        };
    }


    componentDidMount() {




        axios.post('/api/projects', {

            access_token: localStorage.getItem('id_token')

        }).then((response) => {
            this.setState({
                loading: false,
                projects: response.data
            })

        })

        this.props.enqueueSnackbar('12 işin bitiş tarihi gelmek üzere', {
            variant: 'warning'
        });


    }


    render() {

        const {classes} = this.props;
        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {



            content =  <Grid container spacing={40}>
                {this.state.projects.map(project => (
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


        return (


                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="primary"
                                    className={classes.headingPadding}>
                            PROJELER
                        </Typography>
                        {content}

                    </div>

                </main>

        )
    }
}


Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    connect(null, { push }),
    withStyles(theme),
    withSnackbar
)(Projects);
