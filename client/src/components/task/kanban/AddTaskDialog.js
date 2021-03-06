import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import {compose} from 'recompose';
import withAddButton from "./withAddButton";
import Grid from "@material-ui/core/es/Grid/Grid";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import {DatePicker} from "material-ui-pickers";
import TextField from "@material-ui/core/es/TextField/TextField";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Brightness from "@material-ui/icons/Brightness1";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import PropTypes from 'prop-types';
import axios from "axios";
import {getToken} from "../../../actions/auth";
import departments from '../../../helpers/departments'
import API_URL from '../../../helpers/api_url';
import UserSuggestionWithData from "../../user/UserSuggestionWithData";

const styles = theme => ({
    selectEmpty: {
        width: 200
    },

    formControl: {
        margin: 0,
        minWidth: 120,
    },
    menuItem: {
        padding: 10,

    },
    listItemText: {
        padding: 0,

    },

});

const style = {
    titleTextInput: {
        style: {
            fontSize: 24,

        }

    },
    titleTextBg: {
        style: {
            fontSize: 24,
            backgroundColor: '#f9fbe7'
        }

    },
    descBg: {
        style: {

            backgroundColor: '#f9fbe7'
        }

    }
};

class AddTaskDialog extends Component {

    state = {
        selectedStartDate: this.props.project.startDate,
        selectedEndDate: this.props.project.startDate,
        selectedUsers: [],
        department: ''
    };

    handleStartDateChange = (date) => {
        this.setState({selectedStartDate: date, selectedEndDate: date});
    };
    handleEndDateChange = (date) => {
        this.setState({selectedEndDate: date});
    };

    handleDepartmentChange = (e) => {
        this.setState({department: e.target.value});

    };

    handleSubmit = (e) => {
        e.preventDefault();



        const task = {
            project_id: this.props.project._id,
            title: e.target.title.value,
            note: e.target.note.value,
            assignees: this.state.selectedUsers,
            department: this.state.department,
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate,
            owner: this.props.auth.user
        };


        console.log('sending task -->', task);

        axios.post(API_URL + '/task/add', task, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(() => {
                console.log('task added');
                this.props.onClose();
            })
            .catch(error => {
                console.log(error);
            });

    };

    handleTeamUsersAdd = data => {

        this.setState({selectedUsers: data});
    };

    render() {

        const {selectedStartDate, selectedEndDate, department} = this.state;
        const {open, onClose, classes, team} = this.props;

        const teamWithProp = team.map(m => {
            return {effort: 1, user: m}
        });
        return (
            <div>
                <Dialog
                    onClose={onClose}
                    aria-labelledby="add-task-dialog"
                    open={open}
                    fullWidth={true}
                    maxWidth="md"


                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogContent  style={{backgroundColor: '#f8f8ff'}}>
                            <Grid container direction="column" alignItems="flex-start">


                                <TextField
                                    id="task-name"
                                    name="title"
                                    label="İşin Başlığı"
                                    margin="dense"
                                    InputLabelProps={style.titleTextInput}
                                    inputProps={style.titleTextBg}
                                    variant="outlined"
                                    fullWidth


                                />
                                <TextField
                                    id="task-description"
                                    name="note"
                                    placeholder="İşin Açıklaması"
                                    margin="dense"
                                    variant="outlined"
                                    inputProps={style.descBg}
                                    fullWidth


                                />
                            </Grid>


                            <Grid container direction="row" alignItems="center" spacing={24} style={{marginTop: 20}}>

                                <Grid item>
                                    <b>Başlangıç:</b>
                                </Grid>

                                <Grid item>
                                    <DatePicker id="selectedStartDate" value={selectedStartDate} format="DD/MM/YYYY"
                                                onChange={this.handleStartDateChange}/>
                                </Grid>
                                <Grid item>
                                    <b>Bitiş:</b>
                                </Grid>

                                <Grid item>
                                    <DatePicker id="selectedEndDate" value={selectedEndDate} format="DD/MM/YYYY"
                                                onChange={this.handleEndDateChange}/>
                                </Grid>
                                <Grid item>
                                    <b>Departman:</b>
                                </Grid>
                                <Grid item>

                                    <Select
                                        value={department}
                                        onChange={this.handleDepartmentChange}
                                        name="department"
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        renderValue={value => value}
                                        inputProps={{
                                            name: 'department',
                                            id: 'department-select',
                                            style: {margin: 0}
                                        }}
                                    >

                                        {
                                            departments.map((department, key) =>
                                                <MenuItem key={key} value={department.name}
                                                          className={classes.menuItem}>
                                                    <ListItemIcon><Brightness
                                                        style={{color: department.color}}/></ListItemIcon>
                                                    <ListItemText inset primary={department.name}
                                                                  className={classes.listItemText}/>
                                                </MenuItem>
                                            )

                                        }


                                    </Select>


                                </Grid>

                            </Grid>

                            <div style={{marginTop: 22}}>
                                <UserSuggestionWithData list={teamWithProp} onUserAdd={this.handleTeamUsersAdd}
                                                        dataType="effort"/>
                            </div>


                        </DialogContent>

                        <DialogActions>
                            <Button onClick={onClose} color="primary">
                                VAZGEÇ
                            </Button>
                            <Button color="primary" type="submit">
                                KAYDET
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>


            </div>
        )
    }
}

AddTaskDialog.propTypes = {
    addTask: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,

};

export default compose(
    withStyles(styles),
    withAddButton
)(AddTaskDialog);
