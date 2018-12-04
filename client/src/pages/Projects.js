import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/Styles";
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";


function ProjectGrid(props)  {


        const {classes} = props;
        return (

            <Grid container spacing={40}>
                {props.projects.map(project => (
                    <Grid item sm={8} md={6} lg={4} className={classes.gridItem}>
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
        )


}


ProjectGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ProjectGridWrapper = withStyles(theme)(ProjectGrid);


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            projects: [],
            labelWidth: 0,
            loading: false


        };
    }

    handleChange = event => {
        //this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        axios.post('/api/projects', {

            access_token: JSON.parse(localStorage.getItem('id_token')).access_token

        }).then((response) => {
            this.setState({
                loading: false,
                projects: response.data
            })

        })


    }


    render() {
        const {classes} = this.props;
        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content = <ProjectGridWrapper projects={this.state.projects} classes={this.props}/>

        }


        return (
            <React.Fragment>
                <CssBaseline/>
                <Header history={this.props.history}/>
                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
                            Projeni Seç
                        </Typography>
                        {content}

                    </div>

                </main>

            </React.Fragment>
        )
    }
}




Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Projects);
