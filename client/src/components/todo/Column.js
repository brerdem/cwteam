import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Task from "./Task";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";


const styles = theme => ({

    columnItem: {
        border: 'solid 1px lightgray',
        padding: 18,

    },

    columnItemDraggingOver: {
      backgroundColor: '#c7fdff',


    },
    columnInner: {
        padding: '10px 0',
        flexGrow: 1,
        minHeight: 300,
        height: '90%'
    }

});


class Column extends Component {

    render() {
        const {classes} = this.props;
        return (


            <Grid item xs={4} className={classes.columnItem} direction="column">
                <Typography gutterBottom variant="h5" component="h2" style={{color: this.props.column.color}}>
                    {this.props.column.title}
                </Typography>

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

            </Grid>
        )
    }
}

export default withStyles(styles)(Column);
