import React, {Component} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import {store} from '../../../helpers/store';
import axios from "axios";
import {getToken} from "../../../actions/auth";

const API_URL = 'http://localhost:3000/api';

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

        console.log(result);

        const {project_id, tasks} = this.props;
       // const {tasks} = this.state;

        const {destination, source, draggableId} = result;
        console.log('result', result);

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

        const task = tasks[start].find(t => t._id == draggableId);

        tasks[start].splice(source.index, 1);
        tasks[finish].splice(destination.index, 0, task);

        store.dispatch({type: 'REORDER_TASK_DONE', tasks, project_id});

        //todo make another reducer dispatch before async request

        axios.post(API_URL + '/task/reorder', {
            project_id,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            sourceColumn: start,
            destinationColumn: finish
        }, {
            headers: {'Authorization': 'bearer ' + getToken()},

        })
            .then(response => {
                console.log('task reorder action');
            })
            .catch(error => {
                console.log(error);
            });

    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {



        const {project_id, addTask, tasks} = this.props;
        const {columns, columnOrder} = this.state;
        console.log('board -->', tasks);
        return (

            <Grid container spacing={8}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];

                        return <Column key={columnId} column={column} tasks={tasks[columnId]} project_id={project_id}
                                       addTask={addTask}/>;
                    })}
                </DragDropContext>
            </Grid>
        );
    }
}

export default Board;


