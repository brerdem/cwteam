import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TaskItem from "./TaskItem";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";
import theme from '../../styles/Styles'
import AddTask from "./AddTask";

const Column = ({column, classes, project, addTask, tasks, auth}) => {


    console.log('column tasks -->', tasks);

    return (

        <Grid item xs={4} style={{borderRadius: 15}}>
            <div className={classes.columnItem}>
                <div className={classes[column.columnTitleColor]}>
                    <Typography variant="h6" component="h2" style={{color: '#fff'}} align="center">
                        {column.title}
                    </Typography>
                </div>
                <div style={{padding: 10, border: 'solid 1px lightgray', borderTopWidth: 0}}>
                    {column.id === 'backlog' &&
                    <AddTask project={project} addTask={addTask} team={project.team.map(t => t.user)} auth={auth}/>}

                    <Droppable droppableId={column.id}>

                        {(provided, snapshot) => (

                            <div ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 className={classNames(classes.columnInner, snapshot.isDraggingOver ? classes.columnItemDraggingOver : '')}
                            >
                                {tasks.map((task, index) =>
                                    <TaskItem key={index} task={task} index={index}/>
                                )}

                                {provided.placeholder}
                            </div>

                        )}
                    </Droppable>
                </div>
            </div>
        </Grid>
    )

};

export default withStyles(theme)(Column);
