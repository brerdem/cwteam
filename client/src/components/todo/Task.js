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
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Chip from "@material-ui/core/es/Chip/Chip";
import Divider from "@material-ui/core/es/Divider/Divider";
import { DateTimePicker } from 'material-ui-pickers';
import TextField from "@material-ui/core/es/TextField/TextField";


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
        color: '#FFF',
        backgroundColor: '#ff6c00'

    },

    chip: {
        margin: theme.spacing.unit,
    },

});


class Task extends Component {

    state = {
        open: false,
        selectedDate: new Date(),
    };


    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleAssigneeDelete = () => {

    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };


    render() {
        const {classes} = this.props;
        const {selectedDate} = this.state;


        return (
            <div>

                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {this.props.task.content}
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                           İşle ilgili açıklamalar ve detaylar
                        </Typography>
                        <Divider/>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <b>Sorumlular:</b>
                            </Grid>

                            <Grid item>
                                <Chip
                                    avatar={<Avatar alt="Barkın Bulutbeyaz" src={barkin}/>}
                                    label="Barkın Bulutbeyaz"
                                    onDelete={this.handleAssigneeDelete}
                                    className={classes.chip}
                                />
                                <Chip
                                    avatar={<Avatar alt="Burak Erdem">BE</Avatar>}
                                    label="Burak Erdem"
                                    onDelete={this.handleAssigneeDelete}
                                    className={classes.chip}
                                />
                            </Grid>

                         </Grid>

                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Başlangıç:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange} />
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Bitiş:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange} />
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="center" spacing={16}>
                            <Grid item>
                                <b>Efor (saat):</b>
                            </Grid>

                            <Grid item>
                                <TextField
                                    id="Number"

                                    type="number"
                                    defaultValue="1"

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 1,
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            VAZGEÇ
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            KAYDET
                        </Button>
                    </DialogActions>
                </Dialog>


                <Draggable draggableId={this.props.task.id} index={this.props.index}>

                    {(provided, snapshot) =>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Paper
                                onClick={this.handleClickOpen}
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
        );
    }
}

export default withStyles(styles)(Task)
