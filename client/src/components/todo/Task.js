import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper";
import {withStyles} from '@material-ui/core/styles';
import {Draggable} from "react-beautiful-dnd";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import barkin from '../../static/media/barkin.png';


const styles = theme => ({

    taskItem: {
        margin: theme.spacing.unit,
        padding: 12,
        backgroundColor: theme.palette.grey[200]
    },

    taskText: {
        color: '#203ac0'
    },

    taskItemDragging: {

        backgroundColor: '#ffb576'
    },

    dueIcon: {
        fontSize: 18,
        color: theme.palette.secondary,
        margin: 2

    },
    avatar: {
        width: 30,
        height: 30,
        fontSize: 15,
        color:'#FFF',
        backgroundColor: '#ff6c00'

    }


});


class Task extends Component {


    render() {
        const {classes} = this.props;


        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>

                {(provided, snapshot) =>
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                    >
                        <Paper
                            className={classNames(classes.taskItem, snapshot.isDragging ? classes.taskItemDragging : '')}
                            elevation={1}>
                            <Grid container spacing={8}>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1" className={classes.taskText}>
                                        {this.props.task.content}
                                    </Typography>

                                </Grid>
                                <Grid item xs={8} container alignItems="center">
                                    <Grid item>
                                        <Icon className={classes.dueIcon}>access_alarm</Icon>
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="caption" color="textSecondary">
                                            2 gün 13 saat
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={8} direction="row" justify="flex-end">
                                        <Grid item>
                                            <Avatar className={classes.avatar}>BE</Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Avatar className={classes.avatar} src={barkin} alt="Barkın Bulutbeyaz"/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                }
            </Draggable>
        );
    }
}

export default withStyles(styles)(Task)
