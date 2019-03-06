import React, {Component, Fragment} from 'react';
import Gantt from "./Gantt";
import Grid from "@material-ui/core/es/Grid/Grid";
import moment from 'moment';
import GanttToolbar from "./GanttToolbar";
import Fab from "@material-ui/core/Fab";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import theme from "../../../components/styles/Styles";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Fullscreen from "react-full-screen";
import 'moment-business-days';

class GanttContainer extends Component {

    state = {
        zoom: 1,
        isFull: false

    };

    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    };
    handleFullScreenClick = () => {
        this.setState({isFull: !this.state.isFull});

    };

    makeDataForGantt = (projects, tasks) => {

        moment.updateLocale('tr', {
            workingWeekdays: [1, 2, 3, 4, 5]
        });

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

            tasks.forEach(t => {

                if (t.project_id === project._id) {
                    //if (t.status === "backlog" || t.status === "progress") {

                    let startDate = moment(t.startDate);
                    let weekDaysDuration = startDate.businessDiff(moment(t.endDate));
                    console.log('weekDaysDuration -->', weekDaysDuration);

                    data.data.push({
                        id: `${t._id}`,
                        text: t.title,
                        start_date: startDate.format("DD-MM-YYYY"),
                        duration: weekDaysDuration + 1,
                        holder: t.assignees[0].user.first_name,
                        parent: `${project._id}`,
                        color: t.categoryColor,
                        progress: 0.4,
                        task_type: t.status
                    })
                }
                // }

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
        console.log('data -->', data);

        data.links = [];
        return data;

    };

    render() {
        const {currentZoom, isFull} = this.state;
        const {projects, tasks, classes} = this.props;

        return (
            <Fullscreen enabled={this.state.isFull}
                        onChange={isFull => this.setState({isFull})}
            >
                <Fragment>
                    <Grid container direction="column">

                        <GanttToolbar
                            zoom={currentZoom}
                            onZoomChange={this.handleZoomChange}
                        />


                        <Gantt tasks={this.makeDataForGantt(projects, tasks)} zoom={currentZoom}
                               fullscreen={this.state.isFull}/>

                    </Grid>

                </Fragment>
                <Fab color="primary" onClick={this.handleFullScreenClick} className={classes.fabButton}>
                    {isFull ? <FullscreenExit/> : <FullscreenIcon/>}

                </Fab>
            </Fullscreen>

        )
    }
}

export default withStyles(theme)(GanttContainer);



