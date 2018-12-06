import React, {Component} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import axios from "axios/index";


const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Form güncellemeleri'},
        'task-2': {id: 'task-2', content: 'Banner çalışması'},
        'task-3': {id: 'task-3', content: 'ID sorunu'},
        'task-4': {id: 'task-4', content: 'Modeller sayfasının yapılması ve diğer güncellemelerin yayına alınması'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Atanmamış',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            columnTitleColor: 'red'
        },
        'column-2': {
            id: 'column-2',
            title: 'Devam Ediyor',
            taskIds: [],
            columnTitleColor: 'orange'
        },
        'column-3': {
            id: 'column-3',
            title: 'Bitti',
            taskIds: [],
            columnTitleColor: 'green'
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};


class Board extends Component {

    state = initialData;




    onDragEnd = result => {

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
            const newTasksId = Array.from(start.taskIds);
            newTasksId.splice(source.index, 1);
            newTasksId.splice(destination.index, 0, draggableId);

            //Generate new column
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

            this.setState(newState);
            return;
        }
        const startTaskIds = Array.from(start.taskIds);
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

        this.setState(newState)

    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (

            <Grid container spacing={8}>
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {

                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
            </Grid>
        );
    }
}

export default Board;
