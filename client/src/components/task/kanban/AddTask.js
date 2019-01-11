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

const departments = [
    {name: 'Yazılım', color:'#9c27b0'},
    {name: 'Tasarım', color:'#006db0'},
    {name: 'Sosyal Medya', color:'#00a702'},
    {name: 'Müşteri', color:'#db6700'},

];


class AddTask extends Component {


    state = {
        selectedDate: new Date(),
        team: this.props.team,
        selectedUsers: [],
        department: ''
    };

    handleDateChange = (date) => {
        this.setState({selectedDate: date});
    };

    handleDepartmentChange = (e) => {
        this.setState({department: e.target.value});

    };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedUsers);
        let assignees = [];

        this.state.selectedUsers.map((member) => assignees.push({user: member._id, effort: member.effort}));
        this.props.addTask({
            project_id: this.props.project_id,
            title: e.target.title.value,
            note: e.target.note.value,
            assignees: assignees,
            department: this.state.department,
        }).then(() => this.props.onClose())

    };

    handleTeamUsers = data => {
        this.setState({selectedUsers: data});
    };

    componentDidMount() {
        this.setState({team: this.props.team})
    }


    render() {

        const {selectedDate, department} = this.state;
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
                                <DatePicker value={selectedDate} format="DD/MM/YYYY" onChange={this.handleDateChange}/>
                            </Grid>
                            <Grid item>
                                <b>Bitiş:</b>
                            </Grid>

                            <Grid item>
                                <DatePicker value={selectedDate} format="DD/MM/YYYY" onChange={this.handleDateChange}/>
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
                                        <ListItemIcon><Brightness style={{color: department.color}}/></ListItemIcon>
                                        <ListItemText inset primary={department.name} className={classes.listItemText}/>
                                        </MenuItem>
                                    )

                                }



                            </Select>

                        </FormControl>

                        <UserSuggestionInput list={team} onUserAdd={this.handleTeamUsers} effort="true" />


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
    project_id: PropTypes.string.isRequired,

};


export default compose(
    withStyles(styles),
    withAddButton
)(AddTask);
