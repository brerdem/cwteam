import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Project from "./Project";

class Kanban extends Component {

  state = {
  };

  render() {



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

export default Kanban;
