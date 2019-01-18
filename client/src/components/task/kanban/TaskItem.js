import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import {withStyles} from '@material-ui/core/styles';
import {Draggable} from "react-beautiful-dnd";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HourglassFull from "@material-ui/icons/HourglassFull";
import Rowing from "@material-ui/icons/Rowing";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Fade from "@material-ui/core/Fade/Fade";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import moment from 'moment';
import 'moment/locale/tr';
import departments from '../../../helpers/departments'

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
        width: 16,
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
        const {classes, task, index} = this.props;
        if (!task.show) return null;

        const dateStart = moment(task.startDate);
        const dateEnd = moment(task.endDate);

        const task_duration = moment.duration(dateEnd.diff(dateStart));
        const effortTotal = task.assignees.reduce(((m, a) => m + a.effort), 0);
        const departmentColor = departments.find(t => t.name === task.department).color;
        return (
            <Fade in={true} transition={500}>

                <div>

                    <Draggable draggableId={task._id} index={index}>

                        {(provided, snapshot) =>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >


                                <Paper

                                    onClick={this.handleClickOpen}
                                    className={classNames(classes.taskItem, snapshot.isDragging ? classes.taskItemDragging : '')}
                                    style={{borderLeft: `solid 5px ${departmentColor}`}}
                                    elevation={1}>


                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item xs={12}>
                                            <Typography gutterBottom variant="subtitle1"
                                                        className={classes.taskText}>
                                                {task.title}
                                            </Typography>

                                        </Grid>
                                        <Grid item>
                                            <ListItem disableGutters style={{padding: 0}}>
                                                <ListItemIcon style={{marginRight: 4}}>
                                                    <HourglassFull className={classes.dueIcon}/>
                                                </ListItemIcon>
                                                <ListItemText style={{padding: 0}} primary={task_duration.humanize()}
                                                              primaryTypographyProps={{
                                                                  style: {
                                                                      fontSize: '12px',
                                                                      padding: 0
                                                                  }
                                                              }}/></ListItem>
                                            <ListItem disableGutters style={{padding: 0}}>
                                                <ListItemIcon style={{marginRight: 4}}>
                                                    <Rowing className={classes.dueIcon}/>
                                                </ListItemIcon>
                                                <ListItemText style={{padding: 0}} primary={`${effortTotal} saat`}
                                                              primaryTypographyProps={{
                                                                  style: {
                                                                      fontSize: '12px',
                                                                      padding: 0
                                                                  }
                                                              }}/></ListItem>


                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={8} direction="row" alignItems="flex-end"
                                                  justify="flex-end">
                                                {task.assignees.map(assignee =>
                                                    <Grid item key={assignee.user._id}>
                                                        <Avatar style={{
                                                            width: 24,
                                                            height: 24,
                                                            fontSize: 12,
                                                            color: '#FFFFFF',
                                                            backgroundColor: assignee.user.avatar_bg
                                                        }}>{assignee.user.first_name.charAt(0).toLocaleUpperCase() + assignee.user.last_name.charAt(0).toLocaleUpperCase()}</Avatar>
                                                    </Grid>
                                                )}
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
