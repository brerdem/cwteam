import {getToken} from "./auth";
import axios from "axios";

const API_URL = 'http://localhost:3000/api';

const addProjectAC = project => {
    return {
        type: 'ADD_PROJECT_DONE',
        project
    }
};
const deleteProjectAC = id => {
    return {
        type: 'DELETE_PROJECT_DONE',
        id
    }
};

const filterTaskByDepartmentsAC = selectedDepartments => {
    return {
        type: 'FILTER_TASKS_DONE',
        selectedDepartments
    }
};

//action creators
export const addProject = project => dispatch => {

    dispatch(addProjectAC(project));

};

export const deleteProject = id => dispatch => {

    dispatch(deleteProjectAC(id));
};

export const filterTaskByDepartments = selectedDepartments => dispatch => {

    dispatch(filterTaskByDepartmentsAC(selectedDepartments));
};




export const addTask = (task) => {
    console.log('task', task);
    axios.post(API_URL + '/task/add', task, {
        headers: {'Authorization': 'bearer ' + getToken()},

    })
        .then(response => {
            console.log('task added');
        })
        .catch(error => {
            console.log(error);
        });


};
export const reorderTask = (project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn) => dispatch => {

    axios.post(API_URL + '/task/reorder', {project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn}, {
        headers: {'Authorization': 'bearer ' + getToken()},

    })
        .then(response => {
            console.log('task reordered');
        })
        .catch(error => {
            console.log(error);
        });

};

export const reorderTaskImmediately = (project_id, tasks) => dispatch => {
    dispatch({
        type: 'REORDER_TASK_DONE',
        project_id,
        tasks
    })


};



export const getAllProjects = ()  => {
    return {
        types: ['GET_ALL_PROJECTS_LOAD', 'GET_ALL_PROJECTS_DONE', 'GET_ALL_PROJECTS_ERROR'],
        payload: {
            request: {
                url: '/projects'
            }
        }
    }

};












