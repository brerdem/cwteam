import React from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import {store} from '../../../helpers/store';

const columnInfo = {
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

const Board = ({tasks, socket_id, reorderTask, addTask, auth, project}) => {

    const onDragEnd = result => {
        console.log('result', result);

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

        const task = tasks.find(t => t._id === draggableId);

        const payloadData = {
            project_id: project._id,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            start,
            finish,
            task,
            socket_id
        };

        store.dispatch({
            type: 'REORDER_TASK_DONE',
            payload: payloadData
        });

        reorderTask(payloadData);

    };


    console.log('board -->', tasks);
    return (

        <Grid container spacing={8}>
            <DragDropContext onDragEnd={onDragEnd}>
                {columnInfo.columnOrder.map(columnId => {
                    const column = columnInfo.columns[columnId];

                    return <Column key={columnId} column={column} tasks={tasks.filter(t => t.status === columnId)} project={project}
                                   addTask={addTask} auth={auth}/>;
                })}
            </DragDropContext>
        </Grid>
    );
};

export default Board;


