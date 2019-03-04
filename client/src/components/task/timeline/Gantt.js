/*global gantt*/
import React, {Component} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/locale/locale_tr'
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen'
import theme from "../../../components/styles/Styles";
import {withStyles} from '@material-ui/core/styles';

function setTitleGridRow(task) {
    if (task.task_type) {
        return "<b style='color:#3F51B5'>" + task.text + "</b>";
    }
    return task.text;
}

class Gantt extends Component {

    componentDidMount() {

        gantt.config.columns = [
            {name: "text", label: "Görev Adı", tree: true, width: 300, template: setTitleGridRow},
            {name: "start_date", label: "Başlangıç", align: "center", width: 100},
            {name: "holder", label: "Sorumlu", align: "center", width: 100},
            {name: "duration", label: "Süre", align: "center", width: 40},
        ];

        gantt.config.sort = true;
        gantt.config.order_branch = true;

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('component updated -->');
        gantt.render();
    }

    setZoom = (value) => {
        switch (value) {
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    {unit: 'hour', step: 1, date: '%H'}
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "#%W";
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%d %M"}
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%F";
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    {unit: "week", step: 1, date: "#%W"}
                ];
                break;
            default:
                break;
        }
    };

    render() {

        const {zoom, fullscreen} = this.props;
        console.log('fullscreen -->', fullscreen);

        this.setZoom(zoom);
        return (

            <div ref={(input) => {
                this.ganttContainer = input
            }} style={{width: '100%', height: fullscreen ? window.innerHeight - 80 : 500}}/>

        );
    }

}

export default withStyles(theme)(Gantt);
