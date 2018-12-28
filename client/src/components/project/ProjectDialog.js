import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {DateTimePicker} from "material-ui-pickers";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


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
    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addProject({
            title: e.target.title.value,
            description: e.target.description.value
        })


    };


    render() {

        const {open, onClose} = this.props;
        const { selectedDate } = this.state;
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


                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Başlangıç:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange}/>
                            </Grid>

                        </Grid>

                        <Grid container direction="row" alignItems="center" spacing={24}>
                            <Grid item>
                                <b>Bitiş:</b>
                            </Grid>

                            <Grid item>
                                <DateTimePicker value={selectedDate} onChange={this.handleDateChange}/>
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
