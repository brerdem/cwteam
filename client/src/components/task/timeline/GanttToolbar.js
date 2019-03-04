import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
    }

    render() {

        return (
            <Grid container style={{ margin: '15px 20px'}} alignItems="center"
                  direction="row">
                <Typography variant="h6" color="textPrimary">Seviye: </Typography>


                <ToggleButtonGroup

                    style={{marginLeft: 15}}
                    value={this.state.value}
                    onChange={this.handleZoomChange}
                    exclusive

                >
                    <ToggleButton value="Hours">SAATLER</ToggleButton>
                    <ToggleButton value="Days">GÜNLER</ToggleButton>
                    <ToggleButton value="Months">AYLAR</ToggleButton>

                </ToggleButtonGroup>
            </Grid>

        );
    }
}
