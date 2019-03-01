import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TaskItem from "./TaskItem";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";
import theme from '../../styles/Styles'
import AddTask from "./AddTaskDialog";
import {AlertCircleOutline, Update, CheckCircleOutline } from 'mdi-material-ui'

const Column = ({column, classes, project, addTask, tasks, auth}) => {

    tasks.sort((a, b) => a.order-b.order);

    return (

        <Grid item xs={4} className={classes.columnItem}>

                <Grid className={classes[column.columnTitleColor]} direction="row" justify="center" alignItems="flex-end" container style={{padding:5}}>
                    <Grid item style={{color: '#FFF'}}>{column.id === "backlog" ? <AlertCircleOutline/> : column.id === "progress" ? <Update/> : column.id === "done" ? <CheckCircleOutline/> : null}</Grid>
                    <Typography variant="h6" component="h2" style={{color: '#fff', paddingLeft:5}} align="center" >
                      {column.title}
                    </Typography>
                </Grid>
                <div style={{padding: 10, border: 'solid 1px lightgray', borderTopWidth: 0, height: '100%'}}>
                    {column.id === 'backlog' && project &&
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

        </Grid>
    )

};

export default withStyles(theme)(Column);
