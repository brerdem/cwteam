import React from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import {store} from '../../../helpers/store';
import columnInfo from '../../../helpers/columns';


const Board = ({tasks, socket_id, reorderTasks, addTask, auth, project, user}) => {

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

        if (
            destination.droppableId !== source.droppableId &&
            user
        ) {
            return;
        }

        const start = source.droppableId;
        const finish = destination.droppableId;

        const task = tasks.find(t => t._id === draggableId);

        const payloadData = {
            sourceIndex: source.index,
            destinationIndex: destination.index,
            start,
            finish,
            task,
            socket_id
        };


        if (project) {
            payloadData.project_id =  project._id;

        } else if (user) {
            payloadData.user_id =  user._id;
        }
        reorderTasks(payloadData);

        store.dispatch({
            type: `REORDER_${user ? 'USER_':''}TASK_DONE`,
            payload: payloadData
        });



    };


    return (

        <Grid container spacing={8}>
            <DragDropContext onDragEnd={onDragEnd}>
                {columnInfo.columnOrder.map(columnId => {
                    const column = columnInfo.columns[columnId];

                    return <Column key={columnId} column={column} tasks={tasks.filter(t => t.status === columnId)} project={project}
                                   addTask={addTask} auth={auth} />;
                })}
            </DragDropContext>
        </Grid>
    );
};

export default Board;


