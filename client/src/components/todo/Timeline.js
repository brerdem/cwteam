import React, {Component} from 'react';
import Gantt from "./timeline/Gantt";
import initialData from './InitialData';
import Grid from "@material-ui/core/es/Grid/Grid";





function makeDataForGantt(projects) {
    let data = {};
    data.data = [];
    projects.forEach((project, index) => {

        data.data.push(
            {id: `${index}_0`, text: project.name, open: true, color:'#2b8496', holder:'', progress: 1.9/4, editable: false, task_type: 'project'},
            {
                id: `${index}_1`,
                text: initialData.tasks["task-1"].content,
                start_date: '14-12-2018',
                duration: 2,
                holder: 'Barış K.',
                parent: `${index}_0`,
                color: initialData.tasks["task-1"].categoryColor,
                progress: 0.4
            },
            {
                id: `${index}_2`,
                text: initialData.tasks["task-2"].content,
                start_date: '16-12-2018',
                duration: 3,
                holder: 'Çağla K.',
                parent: `${index}_0`,
                color: initialData.tasks["task-2"].categoryColor,
                progress: 0.5
            },
            {
                id: `${index}_3`,
                text: initialData.tasks["task-3"].content,
                start_date: '18-12-2018',
                duration: 4,
                holder: 'Burak E.',
                parent: `${index}_0`,
                color: initialData.tasks["task-3"].categoryColor,
                progress: 0.2
            },
            {
                id: `${index}_4`,
                text: initialData.tasks["task-4"].content,
                start_date: '21-12-2018',
                duration: 4,
                holder: 'Deniz Z.',
                parent: `${index}_0`,
                color: initialData.tasks["task-4"].categoryColor,
                progress: 0.8
            },
        )
    });
    data.links = [];
    return data;

}


class Timeline extends Component {


    state = {};


    render() {

        const {projects} = this.props;

        return (
            <Grid container direction="column" style={{height:this.props.height}}>
                <Grid item xs={12}>
                    <Gantt tasks={makeDataForGantt(projects)}/>
                </Grid>
            </Grid>

        );
    }
}


export default Timeline;
