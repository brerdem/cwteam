import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from "../components/Header";
import theme from "../components/Styles";
import Grid from "@material-ui/core/Grid";
import Board from "../components/todo/Board";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios/index";
import CircularProgress from "@material-ui/core/CircularProgress";


class Todos extends Component {
    state = {
        expanded: null,
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

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {
        const {classes} = this.props;
        const { expanded } = this.state;


        let content;
        if (this.state.loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =

                <Grid container spacing={24} className={classes.todoBackground}>
                    <Grid item xs={12}>
                        {this.state.projects.map((project, index) => (
                            <ExpansionPanel expanded={expanded === `panel${index}`}
                                            onChange={this.handleChange(`panel${index}`)}>

                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.heading} color="primary">{project.name}</Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Board/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
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
