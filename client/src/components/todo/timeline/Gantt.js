/*global gantt*/
import React, {Component} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/locale/locale_tr'
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen'
import Fab from "@material-ui/core/Fab";
import theme from "../../../components/styles/Styles";
import {withStyles} from '@material-ui/core/styles';

import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';


function setTitleGridRow(task) {
    if (task.task_type) {
        return "<b style='color:#3F51B5'>" + task.text + "</b>";
    }
    return task.text;
}


class Gantt extends Component {

    state= {
        fullscreen: false
    };

    componentDidMount() {


        gantt.config.columns = [
            {name: "text", label: "Görev Adı", tree: true, width: 300, template: setTitleGridRow},
            {name: "start_date", label: "Başlangıç", align: "center", width: 100},
            {name: "holder", label: "Sorumlu", align: "center", width: 100},
            {name: "duration", label: "Süre", align: "center", width: 40},
        ];


        gantt.config.sort = true;
        gantt.config.order_branch = true;

        //gantt.config.details_on_dblclick = false;
        gantt.templates.leftside_text = function (start, end, task) {
            if (task.task_type) {
                return "<b style='font-size:14px'>%" + Math.floor(task.progress * 100) + "</b>";
            }
            return "<b>%" + Math.floor(task.progress * 100) + "</b>";
        };

        gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
            const parent = item.parent;
            let children = gantt.getChildren(parent);
            let sum = 0;
            children.forEach((child) => {
                sum += gantt.getTask(child).progress;
            });

            gantt.getTask(parent).progress = sum / children.length;
            gantt.refreshData();
        });

        /* gantt.attachEvent("onTaskDblClick", function (id, e) {
             e.preventDefault();
             if (gantt.hasChild(id)) {
                 console.log(gantt.getTask(id).$open);
                 (gantt.getTask(id).$open) ? gantt.close(id) : gantt.open(id);
                 return true;
             }
             return false;


         });*/


        gantt.templates.task_class = function (start, end, task) {
            let css = [];
            if (task.task_type === 'project') {
                css.push("no_drag_progress");
            }
            return css.join(" ");
        };


        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);


    }

    handleClick = () => {
        if (!gantt.getState().fullscreen) {
            // expanding the gantt to full screen
            gantt.expand();
            this.setState({
                fullscreen: true
            })


        }
        else {
            // collapsing the gantt to the normal mode
            gantt.collapse();
            this.setState({
                fullscreen: false
            })
        }



    };

    render() {

        const {classes} = this.props;
        return (
            <div style={{height:500}}>
                <div ref={(input) => {
                    this.ganttContainer = input
                }} style={{width: '100%', height: '100%'}}/>

                <Fab color="primary" onClick={this.handleClick} className={classes.fabButton}>
                    {this.state.fullscreen ? <FullscreenExit/> : <Fullscreen/>}

                </Fab>

            </div>


        );
    }



}

export default withStyles(theme)(Gantt);
