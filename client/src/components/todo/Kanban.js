import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import theme from "../styles/Styles";
import Grid from "@material-ui/core/Grid";
import Project from "./Project";

class Kanban extends Component {

  state = {
  };

  render() {

      const {classes} = this.props;

    return (
        <Grid container spacing={24} >
            <Grid item xs={12}>
                {this.props.projects.map((project, index) => (
                    <Project project={project} index={index}/>
                ))}
            </Grid>
        </Grid>
    );
  }
}

export default withStyles(theme)(Kanban);
