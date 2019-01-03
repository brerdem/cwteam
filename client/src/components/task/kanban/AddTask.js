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


const styles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },

    formControl: {
        margin: '3px 0',
        minWidth: 120,
    },


});

const style = {
    titleTextInput: {
        style: {
            fontSize: 24,
        }

    }
}


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
        this.props.addProject({
            title: e.target.title.value,
            description: e.target.description.value,
            team: this.state.selectedUsers.map((member) => member._id)
        }).then(() => this.props.onClose())

    };

    handleTeamUsers = data => {
        this.setState({selectedUsers: data});
    };

    componentDidMount() {
        console.log('team', this.props.team);
        this.setState({team: this.props.team})
    }


    render() {

        const {users, selectedDate} = this.state;
        const {open, onClose, classes} = this.props;

        return (
            <div>
                <Dialog
                    onClose={onClose}
                    aria-labelledby="add-task-dialog"
                    open={open}
                    fullWidth={true}
                >

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
                                name="description"
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
                            <Select
                                value={this.state.department}
                                onChange={this.handleDepartmentChange}
                                name="department"
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="" disabled>
                                    Departman
                                </MenuItem>
                                <MenuItem value={'Yazılım'}>Yazılım</MenuItem>
                                <MenuItem value={'Tasarım'}>Tasarım</MenuItem>
                                <MenuItem value={'Sosyal Medya'}>Sosyal Medya</MenuItem>
                                <MenuItem value={'Müşteri'}>Müşteri</MenuItem>
                            </Select>

                        </FormControl>

                        <UserSuggestionInput suggestions={this.props.team} onUserAdd={this.handleTeamUsers}/>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            VAZGEÇ
                        </Button>
                        <Button onClick={onClose} color="primary">
                            KAYDET
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        )
    }
}


export default compose(
    withStyles(styles),
    withAddButton
)(AddTask);
