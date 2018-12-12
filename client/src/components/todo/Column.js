import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Task from "./Task";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";
import theme from '../styles/Styles'
import Paper from "@material-ui/core/Paper";

class Column extends Component {

    render() {
        const {classes} = this.props;

        return (


            <Grid item xs={4}>
                <Paper className={classes.columnItem} elevation={0}>
                <div className={classes[this.props.column.columnTitleColor]}>
                <Typography gutterBottom variant="h6" component="h2" style={{color: '#fff'}} align="center">
                    {this.props.column.title}
                </Typography>
                </div>

                <Droppable droppableId={this.props.column.id}>
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
