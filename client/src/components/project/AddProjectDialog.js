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
import {reduxForm} from "redux-form";
import Field from "redux-form/es/Field";

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
const validate = values => {
    const errors = {};
    const requiredFields = [

        'title',
        'description'

    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Zorunlu Alan'
        }
    });

    return errors
};

const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (

    <TextField
        label={label}
        helperText={touched && error}
        error={touched && error}
        {...input}
        {...custom}
    />
);

const renderCheckBox = ({input, label, ...custom}) => (
    <FormControlLabel
        control={
            <Checkbox
                color="primary"
                checked={input.checked}
                onChange={input.onChange}
                {...custom}
            />}
        label={label}
    />
);

const renderDatePicker = ({input: {value, onChange}}, id) => (
    <DatePicker format="DD/MM/YYYY"
                value={value}
                onChange={onChange}
                id={id}
    />
);

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


    handleDateSetChange = () => {
        this.setState({isSetStartEndDate: !this.state.isSetStartEndDate});
    };
    handleProjectApprovalChange = () => {
        this.setState({isProjectApproved: !this.state.isProjectApproved});
    };

    handleFormSubmit = (props) => {
        console.log('props.selectedStartDate -->', props);
          this.props.addProject({
              startDate: props.selectedStartDate,
              endDate: props.selectedEndDate,
              title: props.title,
              description: props.description,
              team: this.state.selectedUsers,
              budget: props.budget,
          })

    };

    render() {

        const {open, onClose, users, handleSubmit, submitting, pristine, invalid} = this.props;
        const {isSetStartEndDate, isProjectApproved} = this.state;

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

                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <DialogContent style={style.dialogContent}>


                        <Grid container direction="column" alignItems="flex-start">
                            <Field component={renderTextField} label="Proje İsmi" name="title" variant="outlined"
                                   margin="dense" InputLabelProps={style.titleTextInput}
                                   fullWidth
                                   inputProps={style.titleTextBg}/>


                            <Field component={renderTextField} label="Proje Açıklaması" name="description"
                                   variant="outlined"
                                   margin="dense"
                                   fullWidth
                                   inputProps={style.descBg}/>


                            <Field component={renderCheckBox} label="Başlangıç ve bitiş tarihleri belli mi?"
                                   name="startEndDateCheck"
                                   checked={isSetStartEndDate}
                                   onChange={this.handleDateSetChange}
                                   value="checkedB"

                            />


                            {this.state.isSetStartEndDate &&

                            <Grid container direction="row" alignItems="center" spacing={24}>

                                <Grid item>
                                    <b>Başlangıç:</b>
                                </Grid>

                                <Grid item>
                                    <Field component={renderDatePicker} name="selectedStartDate"


                                    />
                                </Grid>
                                <Grid item>
                                    <b>Bitiş:</b>
                                </Grid>

                                <Grid item>
                                    <Field component={renderDatePicker} name="selectedEndDate"


                                    />
                                </Grid>

                            </Grid>
                            }


                            <Field component={renderCheckBox} label="Proje onaylandı mı?"
                                   name="projectApprovedCheck"
                                   checked={isProjectApproved}
                                   onChange={this.handleProjectApprovalChange}
                                   value="checkedB"

                            />

                            {this.state.isProjectApproved &&

                            <Field component={renderTextField} label="Bütçe" name="budget"
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
                        <Button color="primary" type="submit" disabled={pristine || submitting || invalid}>
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

export default reduxForm({
    form: 'addProjectForm',
    validate,
    initialValues: {selectedStartDate: new Date(), selectedEndDate: new Date()}
})(AddProjectDialog);
