import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import API_URL from '../../../helpers/api_url';
import Download from '@material-ui/icons/GetApp';
import fileDownload from 'js-file-download';

export default class GanttToolbar extends Component {

    state = {
        value: 'Days'
    };

    constructor(props) {
        super(props);
        this.handleZoomChange = this.handleZoomChange.bind(this);
    }

    handleZoomChange = (event, value) => {
        this.setState({value});
        if (this.props.onZoomChange) {
            this.props.onZoomChange(value)
        }
    };

    generateExcel = e => {
        e.preventDefault();

        axios({
            url: API_URL + '/task/excel',
            method: 'GET',
            responseType: 'blob'

        }).then(response => {
            //console.log('response.data -->', response);
            fileDownload(response.data, 'report.xlsx');
        })
            .catch(error => {
                console.log(error);
            });
    };

    render() {

        return (
            <Grid container style={{padding: '15px 20px', backgroundColor: '#efefef'}} alignItems="center"
                  direction="row" justify="space-between">
                <Grid item container xs={10}>
                    <Typography variant="h6" color="textPrimary">Seviye: </Typography>


                    <ToggleButtonGroup

                        style={{marginLeft: 15, boxShadow: 'none', border: 'solid 1px #c7c7c7', borderRadius: 6}}
                        value={this.state.value}
                        onChange={this.handleZoomChange}
                        exclusive

                    >
                        <ToggleButton value="Hours">SAATLER</ToggleButton>
                        <ToggleButton value="Days">GÜNLER</ToggleButton>
                        <ToggleButton value="Months">AYLAR</ToggleButton>

                    </ToggleButtonGroup>
                </Grid>
                <Grid item>
                    <IconButton onClick={this.generateExcel}>
                        <Download/>
                    </IconButton>
                </Grid>


            </Grid>

        );
    }
}
