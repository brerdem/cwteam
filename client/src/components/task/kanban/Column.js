import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Task from "./TaskItem";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";
import theme from '../../styles/Styles'
import Paper from "@material-ui/core/Paper";
import AddTask from "./AddTask";

class Column extends Component {

    render() {
        const {column, classes, project_id, onTaskAdd} = this.props;

        return (


            <Grid item xs={4}>
                <Paper className={classes.columnItem} elevation={0}>
                    <div className={classes[column.columnTitleColor]}>
                        <Typography gutterBottom variant="h6" component="h2" style={{color: '#fff'}} align="center">
                            {column.title}
                        </Typography>
                    </div>
                    {column.id === 'backlog' &&  <AddTask project_id={project_id} onTaskAdd={onTaskAdd} /> }

                    <Droppable droppableId={column.id}>

                        {(provided, snapshot) => (


                            <div ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 className={classNames(classes.columnInner, snapshot.isDraggingOver ? classes.columnItemDraggingOver : '')}
                            >
                                {this.props.tasks.map((task, index) =>
                                    <Task key={task.id} task={task} index={index}/>
                                )}

                                {provided.placeholder}
                            </div>

                        )}
                    </Droppable>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(theme)(Column);
