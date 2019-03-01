import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {DatePicker} from "material-ui-pickers";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import UserSuggestionWithData from "../user/UserSuggestionWithData";

const style = {

    dialogContent: {

        backgroundColor: '#f8f8ff'
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

class AddProjectDialog extends Component {

    state = {
        selectedStartDate: new Date(),
        selectedEndDate: new Date(),
        isSetStartEndDate: false,
        isProjectApproved: false,
        selectedUsers: []
    };

    handleTeamUsers = data => {

        this.setState({selectedUsers: data});
    };

    handleStartDateChange = (date) => {
        this.setState({selectedStartDate: date, selectedEndDate: date});
    };
    handleEndDateChange = (date) => {
        this.setState({selectedEndDate: date});
    };
    handleDateSetChange = () => {
        this.setState({isSetStartEndDate: !this.state.isSetStartEndDate});
    };
    handleProjectApprovalChange = () => {
        this.setState({isProjectApproved: !this.state.isProjectApproved});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedUsers);
        this.props.addProject({
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate,
            title: e.target.title.value,
            description: e.target.description.value,
            team: this.state.selectedUsers,
            budget: e.target.budget.value,
        })

    };

    render() {

        const {open, onClose, users} = this.props;
        const {selectedStartDate, selectedEndDate} = this.state;

        const teamWithProp = users.map(m => {
            return {hourly_fee: 100, user: m}
        });
        return (
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth="md"

            >

                <form onSubmit={this.handleSubmit}>
                    <DialogContent style={style.dialogContent}>


                        <Grid container direction="column" alignItems="flex-start">


                            <TextField
                                id="project-name"
                                name="title"
                                placeholder="Proje İsmi"
                                margin="dense"
                                InputLabelProps={style.titleTextInput}
                                inputProps={style.titleTextBg}
                                variant="outlined"
                                fullWidth

                            />
                            <TextField
                                id="project-description"
                                name="description"
                                placeholder="Proje Açıklaması"
                                margin="dense"
                                inputProps={style.descBg}
                                variant="outlined"
                                fullWidth

                            />


                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isSetStartEndDate}
                                        onChange={this.handleDateSetChange}
                                        value="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Başlangıç ve bitiş tarihleri belli mi?"
                            />
                            {this.state.isSetStartEndDate &&

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
                            }

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isProjectApproved}
                                        onChange={this.handleProjectApprovalChange}
                                        value="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Proje onaylandı mı?"
                            />

                            {this.state.isProjectApproved &&

                            <TextField
                                label="Bütçe"
                                name="budget"
                                id="budget"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">TL</InputAdornment>,
                                }}
                            />
                            }


                        </Grid>
                        <div style={{marginTop: 22}}>
                            <UserSuggestionWithData list={teamWithProp} onUserAdd={this.handleTeamUsers}
                                                    dataType="hourly_fee"/>
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
        );
    }
}

AddProjectDialog.propTypes = {
    addProject: PropTypes.func
};

export default AddProjectDialog;
