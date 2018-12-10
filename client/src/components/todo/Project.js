import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from '@material-ui/core/styles';
import theme from '../styles/Styles'
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import classNames from 'classnames';
import Board from "./Board";


const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Form güncellemeleri', categoryColor: '#9c27b0' },
        'task-2': {id: 'task-2', content: 'Banner çalışması', categoryColor: '#8bc34a'},
        'task-3': {id: 'task-3', content: 'ID sorunu', categoryColor: '#9c27b0'},
        'task-4': {id: 'task-4', content: 'Müşteri onayının alınması ve ilgili birimlere brief verilmesi', categoryColor: '#2196f3'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Atanmamış',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            columnTitleColor: 'columnTitleRed'
        },
        'column-2': {
            id: 'column-2',
            title: 'Devam Ediyor',
            taskIds: [],
            columnTitleColor: 'columnTitleOrange'
        },
        'column-3': {
            id: 'column-3',
            title: 'Bitti',
            taskIds: [],
            columnTitleColor: 'columnTitleGreen'
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};


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

    handleBoardChange = columns => {
        this.setState({
            columns: columns
        })
    };


    render() {
        const {expanded} = this.state;
        const {classes, project, index} = this.props;


        return (
            <ExpansionPanel expanded={expanded === `panel${index}`}
                            onChange={this.handleChange(`panel${index}`)}>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography noWrap className={classes.heading}
                                        color="primary">{project.name} </Typography>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={8} direction="row" justify="flex-end">
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleRed)}>{this.state.columns['column-1'].taskIds.length}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleOrange)}>{this.state.columns['column-2'].taskIds.length}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        className={classNames(classes.avatarSmall, classes.columnTitleGreen)}>{this.state.columns['column-3'].taskIds.length}</Avatar>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Board data={this.state.data} onChange={this.handleBoardChange.bind(this)}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default withStyles(theme)(Project);
