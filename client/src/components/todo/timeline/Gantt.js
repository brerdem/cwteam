/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/locale/locale_tr'

export default class Gantt extends Component {
    componentDidMount() {
        gantt.config.columns =  [
            {name:"text",       label:"Görev Adı",  tree:true, width:250 },
            {name:"start_date", label:"Başlangıç", align:"center" },
            {name:"holder",     label:"Sorumlu",     align:"center" },
            {name:"duration",   label:"Süre",   align:"center" },
        ];


        gantt.init(this.ganttContainer);
        gantt.parse(this.props.tasks);
    }

    render() {
        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}
