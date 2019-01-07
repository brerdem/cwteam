import React from 'react';
import Grid from "@material-ui/core/Grid";
import Project from "./kanban/Project";

const Kanban = props => {


    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                {props.projects.map((project, index) => {
                    const tasks = props.tasks.map(task => task.project_id === project._id);
                    return <Project project={project} tasks={tasks} index={index}/>;

                })}
            </Grid>
        </Grid>
    );

};

export default Kanban;
