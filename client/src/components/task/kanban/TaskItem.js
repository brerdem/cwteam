import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import {withStyles} from '@material-ui/core/styles';
import {Draggable} from "react-beautiful-dnd";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import HourglassFull from "@material-ui/icons/HourglassFull";
import Edit from "@material-ui/icons/Edit";
import Rowing from "@material-ui/icons/Rowing";
import MoreVert from "@material-ui/icons/MoreVert";
import Delete from "@material-ui/icons/Delete"
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import moment from 'moment';
import 'moment/locale/tr';
import departments from '../../../helpers/departments';
import UserAvatar from 'react-user-avatar'
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import API_URL from "../../../helpers/api_url";
import {getToken} from "../../../actions/auth";

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
    menuItem: {
        padding: '0 10px 0 10px'
    },
    listItemText: {
        padding: 0,
        fontSize: 12
    },
    icon: {
        marginRight: 10,

    },

});

class TaskItem extends Component {

    state = {
        open: false,
        anchorEl: null,
        selectedDate: new Date(),
        selectedTaskId: null
    };

    handleMenu = id => event => {
        this.setState({anchorEl: event.currentTarget, open: true, selectedTaskId: id});
    };


    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };

    editTask = () => {

    };

    deleteTask = () => {
        axios.post(API_URL + '/task/delete', {id: this.state.selectedTaskId}, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(() => {
                console.log('task added');
               this.setState({open: false});
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const {classes, task, index} = this.props;
        const {open, anchorEl} = this.state;
        if (!task.show) return null;

        const dateStart = moment(task.startDate);
        const dateEnd = moment(task.endDate);

        const task_duration = moment.duration(dateEnd.diff(dateStart));
        const effortTotal = task.assignees.reduce(((m, a) => m + a.effort), 0);
        const departmentColor = departments.find(t => t.name === task.department).color;
        return (
            <div>
                <Popover
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}

                    open={open} anchorEl={anchorEl}
                >

                    <Paper>
                        <ClickAwayListener onClickAway={this.handleClose} touchEvent={false}>
                            <MenuList>
                                <MenuItem className={classes.menuItem} onClick={this.editTask}>
                                    <ListItemIcon className={classes.icon}>
                                        <Edit style={{fontSize: 16}} color="action"/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}
                                                  primaryTypographyProps={{style: {fontSize: 14}}} inset
                                                  primary="Düzenle"/>
                                </MenuItem>
                                <MenuItem className={classes.menuItem} onClick={this.deleteTask}>
                                    <ListItemIcon className={classes.icon}>
                                        <Delete style={{fontSize: 16}} color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText}
                                                  primaryTypographyProps={{style: {fontSize: 14}}} inset primary="Sil"/>
                                </MenuItem>

                            </MenuList>
                        </ClickAwayListener>
                    </Paper>

                </Popover>


                <div>

                    <Draggable draggableId={task._id} index={index}>

                        {(provided, snapshot) =>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >


                                <Paper


                                    className={classNames(classes.taskItem, snapshot.isDragging ? classes.taskItemDragging : '')}
                                    style={{borderLeft: `solid 5px ${departmentColor}`}}
                                    elevation={1}>
                                    <ClickAwayListener onClickAway={this.handleClose}>

                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid item container justify="space-between">
                                                <Typography gutterBottom variant="subtitle1"
                                                            className={classes.taskText}>
                                                    {task.title}
                                                </Typography>
                                                <IconButton
                                                    onClick={this.handleMenu(task._id)}
                                                    style={{
                                                        background: 'none',
                                                        margin: '-22px -24px 0 0'
                                                    }}><MoreVert/></IconButton>


                                            </Grid>
                                            <Grid item>
                                                <ListItem disableGutters style={{padding: 0}}>
                                                    <ListItemIcon style={{marginRight: 4}}>
                                                        <HourglassFull className={classes.dueIcon}/>
                                                    </ListItemIcon>
                                                    <ListItemText style={{padding: 0}}
                                                                  primary={task_duration.humanize()}
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
                                                            <UserAvatar size={24} style={{
                                                                fontSize: 12,
                                                                color: '#FFF',
                                                                fontWeight: 600
                                                            }} name={assignee.user.name}
                                                                        src={assignee.user.avatar_url ? `/img/users/${assignee.user.avatar_url}.jpg` : null}/>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ClickAwayListener>
                                </Paper>

                            </div>
                        }
                    </Draggable>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(TaskItem)
