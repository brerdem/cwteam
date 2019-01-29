import React from 'react';
import Gantt from "./timeline/Gantt";
import Grid from "@material-ui/core/es/Grid/Grid";
import moment from 'moment';

function makeDataForGantt(projects) {
    let data = {};
    data.data = [];
    projects.forEach((project) => {
      //  let projectStartDate =  moment(project.startDate).format("DD-MM-YYYY");
      //  let projectDuration = moment.duration(moment(project.endDate).diff(moment(project.startDate)));


        data.data.push({
            id: `${project._id}`,
            text: project.title,
            color: '#2b8496',
            holder: '',
            progress: 1.9 / 4,
            editable: false,
            task_type: 'project'
        });
        project.tasks.backlog.forEach(t => {

            let startDate =  moment(t.startDate).format("DD-MM-YYYY");
            let duration = moment.duration(moment(t.endDate).diff(moment(t.startDate)));

           data.data.push({
                id: `${t._id}`,
                text: t.title,
                start_date: startDate,
                duration: duration.days(),
                holder: t.assignees[0].user.first_name,
                parent: `${project._id}`,
                color: t.categoryColor,
                progress: 0.4
            })
        });
        project.tasks.progress.forEach(t => {

            let startDate =  moment(t.startDate).format("DD-MM-YYYY");
            let duration = moment.duration(moment(t.endDate).diff(moment(t.startDate)));

            data.data.push({
                id: `${t._id}`,
                text: t.title,
                start_date: startDate,
                duration: duration.days(),
                holder: t.assignees[0].user.first_name,
                parent: `${project._id}`,
                color: t.categoryColor,
                progress: 0.4
            })
        });

        /*  {
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
          },*/
    });

    data.links = [];
    return data;

}

const Timeline = function (props) {

    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Gantt tasks={makeDataForGantt(props.projects)}/>
            </Grid>
        </Grid>

    );

};

export default Timeline;
