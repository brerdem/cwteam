import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper";
import {withStyles} from '@material-ui/core/styles';
import {Draggable} from "react-beautiful-dnd";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rowing from "@material-ui/icons/Rowing";
import HourglassFull from "@material-ui/icons/HourglassFull";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import barkin from '../../../static/media/barkin.png';
import Fade from "@material-ui/core/Fade/Fade";

const styles = theme => ({

    taskItem: {
        margin: theme.spacing.unit,
        padding: '12px 12px 2px 12px',
        backgroundColor: theme.palette.grey[200],

    },

    taskText: {
        color: '#203ac0'
    },

    taskItemDragging: {
        backgroundColor: '#ffb576'
    },

    dueIcon: {
        width: 14,
        color: theme.palette.secondary,
        margin: 0

    },
    avatar: {
        width: 30,
        height: 30,
        fontSize: 15,
        color: '#FFF',
        backgroundColor: '#ff6c00'

    },

    chip: {
        margin: theme.spacing.unit,
    },

});

class TaskItem extends Component {

    state = {
        open: false,
        selectedDate: new Date(),
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <Fade in={true} transition={500}>

                <div>

                    <Draggable draggableId={this.props.task._id} index={this.props.index}>

                        {(provided, snapshot) =>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >


                                <Paper

                                    onClick={this.handleClickOpen}
                                    className={classNames(classes.taskItem, snapshot.isDragging ? classes.taskItemDragging : '')}
                                    style={{borderLeft: `solid 5px ${this.props.task.categoryColor}`}}
                                    elevation={1}>


                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography gutterBottom variant="subtitle1"
                                                        className={classes.taskText}>
                                                {this.props.task.title}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={5} container alignItems="center">
                                            <Grid item>
                                                <HourglassFull className={classes.dueIcon}/>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption" color="textSecondary">
                                                    2 gün 13 saat
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Rowing className={classes.dueIcon}/>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption" color="textSecondary">
                                                    15 saat
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={8} direction="row" alignItems="center">
                                                <Grid item>
                                                    <Avatar className={classes.avatar}>BE</Avatar>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar className={classes.avatar} src={barkin}
                                                            alt="Barkın Bulutbeyaz"/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Paper>

                            </div>
                        }
                    </Draggable>
                </div>
            </Fade>
        );
    }
}

export default withStyles(styles)(TaskItem)
