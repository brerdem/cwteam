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
import Chip from "@material-ui/core/es/Chip/Chip";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


class Project extends Component {

    state = {
        expanded: this.props.edit,
    };

    handleChange = event => {
        this.setState({
            expanded: !this.state.expanded,
        });
    };
    getHourlyFee = a => {

        return this.props.project.team.find(m => m.user._id === a.user._id).hourly_fee;
    };

    calculateTotalEffort = (m, t) => {
        return (t.hasOwnProperty('assignees')) ? t.assignees.reduce(this.calculateTotalEffort, m) : t.effort * this.getHourlyFee(t) + m;
    };



    render() {

        const {expanded} = this.state;
        const {classes, project, children, tasks} = this.props;

        const totalBudget = tasks.reduce(this.calculateTotalEffort, 0);

        const tooltipText = Math.abs(totalBudget - project.budget) + ' TL ' + (totalBudget < project.budget ? 'daha kullanılabilir' : 'efor aşımı var');

        return (
            <ExpansionPanel expanded={expanded}
                            onChange={this.handleChange} className={classes.expansionPanel} >

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container alignItems="center" justify="space-between" direction="row" style={{padding: 0}}>

                        <Typography noWrap className={classes.heading}
                                    color="primary">{project.title} </Typography>


                        <Grid container spacing={8} direction="row" justify="flex-end" alignItems="center"
                              style={{width: 250, marginRight: 30}}>

                            <Tooltip placement="left" title={tooltipText}>
                                <Chip avatar={<Avatar style={{
                                    color: '#FFF',
                                    backgroundColor: totalBudget < project.budget ? 'green' : 'red'
                                }}>TL</Avatar>} label={totalBudget.toString()} className={classes.chip}
                                      variant="outlined" style={{marginRight: 10}}/>
                            </Tooltip>


                            <Avatar
                                className={classNames(classes.avatarSmall, classes.columnTitleRed)}>{tasks.filter(t => t.status === "backlog").length}</Avatar>


                            <Avatar
                                className={classNames(classes.avatarSmall, classes.columnTitleOrange)}>{tasks.filter(t => t.status === "progress").length}</Avatar>


                            <Avatar
                                className={classNames(classes.avatarSmall, classes.columnTitleGreen)}>{tasks.filter(t => t.status === "done").length}</Avatar>

                        </Grid>


                    </Grid>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{paddingBottom:60}}>
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


