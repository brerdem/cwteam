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
import UserSuggestionInput from "../../user/UserSuggestionInput";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Brightness from "@material-ui/icons/Brightness1";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import PropTypes from 'prop-types';
import axios from "axios";
import {getToken} from "../../../actions/auth";
import departments from '../../../helpers/departments'
import API_URL from '../../../helpers/api_url';




const styles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        width: 200
    },

    formControl: {
        margin: '10px 0',
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

    }
};


class AddTask extends Component {

    state = {
        selectedStartDate:this.props.project.startDate,
        selectedEndDate: this.props.project.startDate,
        team: this.props.team,
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

        let assignees = [];

        this.state.selectedUsers.map((member) => assignees.push({user: member, effort: member.effort}));
        const task = {

            title: e.target.title.value,
            note: e.target.note.value,
            assignees: assignees,
            department: this.state.department,
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate,
            owner: this.props.auth.user
        };

        axios.post(API_URL + '/task/add', {task,  project_id: this.props.project._id}, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(response => {
                console.log('task added');
                this.props.onClose();
            })
            .catch(error => {
                console.log(error);
            });

    };

    handleTeamUsers = data => {
        this.setState({selectedUsers: data});
    };

    componentDidMount() {
        this.setState({team: this.props.team})
    }

    render() {

        const {selectedStartDate, selectedEndDate, department} = this.state;
        const {open, onClose, classes, team} = this.props;

        return (
            <div>
                <Dialog
                    onClose={onClose}
                    aria-labelledby="add-task-dialog"
                    open={open}
                    fullWidth={true}
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogContent>
                            <Grid container direction="column" alignItems="flex-start">


                                <TextField
                                    id="task-name"
                                    name="title"
                                    placeholder="Başlık"
                                    margin="normal"
                                    InputLabelProps={style.titleTextInput}
                                    inputProps={style.titleTextInput}
                                    fullWidth

                                />
                                <TextField
                                    id="task-description"
                                    name="note"
                                    placeholder="Açıklama"
                                    margin="dense"
                                    fullWidth

                                />
                            </Grid>


                            <Grid container direction="row" alignItems="center" spacing={24}>

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

                            </Grid>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor={'department-select'}>Departman</InputLabel>
                                <Select
                                    value={department}
                                    onChange={this.handleDepartmentChange}
                                    name="department"

                                    className={classes.selectEmpty}
                                    renderValue={value => value}
                                    inputProps={{
                                        name: 'department',
                                        id: 'department-select',
                                    }}
                                >

                                    {
                                        departments.map((department, key) =>
                                            <MenuItem key={key} value={department.name} className={classes.menuItem}>
                                                <ListItemIcon><Brightness
                                                    style={{color: department.color}}/></ListItemIcon>
                                                <ListItemText inset primary={department.name}
                                                              className={classes.listItemText}/>
                                            </MenuItem>
                                        )

                                    }


                                </Select>

                            </FormControl>

                            <UserSuggestionInput list={team} onUserAdd={this.handleTeamUsers} effort="true"/>


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

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,

};

export default compose(
    withStyles(styles),
    withAddButton
)(AddTask);
