import React, {Component} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import _ from 'underscore';

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

        const {tasks, onTaskReorder} = this.props;

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

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTasksId = tasks.map(task => task._id);

            console.log(newTasksId);
            newTasksId.splice(source.index, 1);
            newTasksId.splice(destination.index, 0, draggableId);

            onTaskReorder(newTasksId).then(response => {

            }).catch(err => {
                console.log(err);
            });




          /*  //Generate new column
            const newColumn = {
                ...start,
                taskIds: newTasksId,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);*/
            return;
        }
       /* const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(source.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);*/

    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const {project_id, onTaskAdd, tasks} = this.props;
        const {columns, columnOrder} = this.state;
        console.log('board -->', tasks);
        return (

            <Grid container spacing={8}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];
                        const column_tasks = _.where(tasks, {status: columnId}) || [];
                        return <Column key={column.id} column={column} tasks={column_tasks} project_id={project_id}
                                       onTaskAdd={onTaskAdd}/>;
                    })}
                </DragDropContext>
            </Grid>
        );
    }
}

export default Board;


