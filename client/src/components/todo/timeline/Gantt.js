/*global gantt*/
import React, {Component} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/locale/locale_tr'


function setTitleGridRow(task) {
    if (task.task_type) {
        return "<b style='color:#3F51B5'>"+task.text+"</b>";
    }
    return task.text;
}


export default class Gantt extends Component {

    componentDidMount() {



        gantt.config.columns = [
            {name: "text", label: "Görev Adı", tree: true, width: 300, template: setTitleGridRow},
            {name: "start_date", label: "Başlangıç", align: "center", width: 100},
            {name: "holder", label: "Sorumlu", align: "center", width: 100},
            {name: "duration", label: "Süre", align: "center", width: 40},
        ];



        gantt.config.sort = true;
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

        gantt.templates.task_class = function(start, end, task){
            let css = [];
            if(task.task_type === 'project'){
                css.push("no_drag_progress");
            }
            return css.join(" ");
        }


        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);
    }

    render() {
        return (
            <div
                ref={(input) => {
                    this.ganttContainer = input
                }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}
