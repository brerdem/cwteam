import React, {Component} from 'react';
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";

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

        const {reorderTask, project_id} = this.props;

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

        reorderTask(project_id, draggableId, source.index, destination.index, start.id, finish.id).then(response => {

        }).catch(err => {
            console.log(err);
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


