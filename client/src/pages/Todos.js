import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/styles/Styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Project from "../components/todo/Project";


const colors = {
    orange: {
        backgroundColor: '#99000'
    }
}


class Todos extends Component {
    state = {
        loading: true
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



    render() {
        const {classes} = this.props;


        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =

                <Grid container spacing={24} className={classes.todoBackground}>
                    <Grid item xs={12}>
                        {this.state.projects.map((project, index) => (
                            <Project project={project} index={index}/>
                        ))}
                    </Grid>
                </Grid>

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

export default withStyles(theme)(Todos);
