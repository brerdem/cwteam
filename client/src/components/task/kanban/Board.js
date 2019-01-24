import React, {Component} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import {store} from '../../../helpers/store';
import axios from "axios";
import {getToken} from "../../../actions/auth";
import API_URL from '../../../helpers/api_url';


class Board extends Component {

    state = {
        columns: {
            'backlog': {
                id: 'backlog',
                title: 'Backlog',
                columnTitleColor: 'columnTitleRed'
            },
            'progress': {
                id: 'progress',
                title: 'In Progress',
                columnTitleColor: 'columnTitleOrange'
            },
            'done': {
                id: 'done',
                title: 'Done',
                columnTitleColor: 'columnTitleGreen'
            },
        },
        columnOrder: ['backlog', 'progress', 'done'],

    };

    onDragEnd = result => {
        console.log('result', result);

        const {project, socket_id} = this.props;

        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = source.droppableId;
        const finish = destination.droppableId;

        const task = project.tasks[start].find(t => t._id === draggableId);
        /*
                tasks[start].splice(source.index, 1);
                tasks[finish].splice(destination.index, 0, task);
                console.log('tasks', tasks);
                console.log('tasks-start', tasks[start]);
                console.log('tasks-finish', tasks[finish]);*/

        store.dispatch({
            type: 'REORDER_TASK_DONE',
            payload: {
                project_id: project._id,
                start,
                finish,
                sourceIndex: source.index,
                destinationIndex: destination.index,
                task
            }
        });

        axios.post(API_URL + '/task/reorder', {
            project_id: project._id,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            task,
            start,
            finish,
            socket_id

        }, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(() => {
                console.log('task reorder action');

            })
            .catch(error => {
                console.log(error);
            });

    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {

        const {project, addTask, auth} = this.props;
        const {columns, columnOrder} = this.state;

        console.log('board -->', project.tasks);
        return (

            <Grid container spacing={8}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];

                        return <Column key={columnId} column={column} tasks={project.tasks[columnId]} project={project}
                                       addTask={addTask} auth={auth}/>;
                    })}
                </DragDropContext>
            </Grid>
        );
    }
}

export default Board;


