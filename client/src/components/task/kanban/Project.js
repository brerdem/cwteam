import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import theme from '../../styles/Styles'
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import classNames from 'classnames';
import initialData from '../InitialData';

class Project extends Component {

    state = {
        expanded: null,
        data: initialData,
        columns: initialData.columns
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };



    render() {
        const {expanded} = this.state;
        const {classes, project, index, children} = this.props;

        return (
            <ExpansionPanel expanded={expanded === `panel${index}`}
                            onChange={this.handleChange(`panel${index}`)} className={classes.expansionPanel}>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography noWrap className={classes.heading}
                                        color="primary">{project.title} </Typography>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={8} direction="row" justify="flex-end">
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleRed)}>{project.tasks.backlog.length}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleOrange)}>{project.tasks.progress.length}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleGreen)}>{project.tasks.done.length}</Avatar>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Project);


