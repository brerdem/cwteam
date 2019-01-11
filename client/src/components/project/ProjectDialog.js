import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {DatePicker} from "material-ui-pickers";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import UserSuggestionInput from '../user/UserSuggestionInput';

const style = {

    dialog: {
        padding: 0,
        margin: 0
    },
    dialogContent: {
        paddingTop: 0,
        margin: 0
    },

    dialogTitle: {
        padding: '0px 24px',

    },

    titleText: {

        padding: 0,
        width: 300

    },
    descriptionText: {

        padding: 0,
        width: 300

    },

    titleTextInput: {
        style: {
            fontSize: 24,
        }

    }
};

class ProjectDialog extends Component {

    state = {
        selectedDate: new Date(),
        isSetStartEndDate: false,
        users: [],
        selectedUsers: []
    };

    handleTeamUsers = data => {
        this.setState({selectedUsers: data});
    };

    handleDateChange = date => {
        this.setState({selectedDate: date});
    };
    handleChange = () => {
        this.setState({isSetStartEndDate: !this.state.isSetStartEndDate});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedUsers);
        this.props.addProject({
            title: e.target.title.value,
            description: e.target.description.value,
            team: this.state.selectedUsers.map((member) => member._id)
        })

    };

    componentDidMount() {
        this.props.getAllUsers().then((response) => this.setState({users: response.payload.data}));
    }

    render() {

        const {open, onClose} = this.props;
        const {selectedDate, users} = this.state;
        return (
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                style={style.dialog}

            >

                <form onSubmit={this.handleSubmit}>
                    <DialogContent style={style.dialogContent}>


                        <Grid container direction="column" alignItems="flex-start">


                            <TextField
                                id="project-name"
                                name="title"
                                placeholder="Proje İsmi"
                                margin="normal"
                                InputLabelProps={style.titleTextInput}
                                inputProps={style.titleTextInput}
                                fullWidth

                            />
                            <TextField
                                id="project-description"
                                name="description"
                                placeholder="Proje Açıklaması"
                                margin="dense"
                                fullWidth

                            />
                        </Grid>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.isSetStartEndDate}
                                    onChange={this.handleChange}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="Başlangıç ve bitiş tarihleri belli"
                        />
                        {this.state.isSetStartEndDate &&

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
                        }

                        <UserSuggestionInput list={users} onUserAdd={this.handleTeamUsers} />


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
        );
    }
}

export default ProjectDialog;
