import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Task from "./Task";
import {withStyles} from '@material-ui/core/styles';
import {Droppable} from "react-beautiful-dnd";
import classNames from "classnames";
import Divider from "@material-ui/core/es/Divider/Divider";


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


            <Grid item xs={4} className={classes.columnItem}>
                <div style={{backgroundColor: this.props.column.columnTitleColor}}>
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

            </Grid>
        )
    }
}

export default withStyles(styles)(Column);
