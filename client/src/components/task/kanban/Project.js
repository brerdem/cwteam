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
import Chip from "@material-ui/core/es/Chip/Chip";

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

    calculateTotalEffort = (m, t) => {
            console.log('t değeri', t);
    return (t.hasOwnProperty('assignees')) ? t.assignees.reduce(this.calculateTotalEffort, m) : t.effort * t.user.hourly_fee + m ;
    };

    render() {
        const {expanded} = this.state;
        const {classes, project, index, children, loading} = this.props;

        let totalBudget = 0;
        Object.keys(project.tasks).forEach(p => {
console.log('project-type', project.tasks[p]);
            totalBudget += project.tasks[p].length > 0 ?  project.tasks[p].reduce(this.calculateTotalEffort, 0) : 0;
        });

        return (
            <ExpansionPanel expanded={expanded === `panel${index}`}
                            onChange={this.handleChange(`panel${index}`)} className={classes.expansionPanel}>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container style={{padding: 0}} alignItems="center" justify="space-between" direction="row">

                            <Typography noWrap className={classes.heading}
                                        color="primary">{project.title} </Typography>



                            <Grid container spacing={8} direction="row" justify="flex-end" alignItems="center" style={{width: 250,marginRight:30}}>
                                <Chip avatar={<Avatar>TL</Avatar>} label={totalBudget.toString()} className={classes.chip}
                                      variant="outlined" style={{marginRight:10}}/>


                                <Avatar
                                    className={classNames(classes.avatarSmall, classes.columnTitleRed)}>{project.tasks.backlog.length}</Avatar>


                                <Avatar
                                    className={classNames(classes.avatarSmall, classes.columnTitleOrange)}>{project.tasks.progress.length}</Avatar>


                                <Avatar
                                    className={classNames(classes.avatarSmall, classes.columnTitleGreen)}>{project.tasks.done.length}</Avatar>

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


