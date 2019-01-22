import {getToken} from "./auth";
import axios from "axios";

const API_URL = 'http://localhost:3000/api';


const filterTaskByDepartmentsAC = selectedDepartments => {
    return {
        type: 'FILTER_TASKS_DONE',
        selectedDepartments
    }
};

//action creators
export const addProject = project => dispatch => {
    axios.post(API_URL + '/project/add', project, {
        headers: {'Authorization': 'bearer ' + getToken()},

    })
        .then(response => {
            console.log('project added');
        })
        .catch(error => {
            console.log(error);
        });



    // dispatch(addProjectAC(project));

};

export const deleteProject = id => dispatch => {

    axios.post(API_URL + '/project/delete', id, {
        headers: {'Authorization': 'bearer ' + getToken()},

    })
        .then(response => {
            console.log('project deleted');
        })
        .catch(error => {
            console.log(error);
        });

    //dispatch(deleteProjectAC(id));
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












