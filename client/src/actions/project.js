import {getToken} from "./auth";
import axios from 'axios';
import Pusher from "pusher-js";


const API_URL = 'http://localhost:3000/api/';
const PUSHER_APP_KEY = 'INSERT_APP_KEY';
const PUSHER_APP_CLUSTER = 'eu';





//action creators
export const addProject = project => dispatch =>{

    axios.post('/project/add', {
        headers: { 'Authorization': 'bearer '+ getToken() },
        data: project

      })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      });


    console.log('project', project);


   /* return {
        types: ['ADD_PROJECT_LOAD', 'ADD_PROJECT_DONE', 'ADD_PROJECT_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/project/add',
                headers: { 'Authorization': 'bearer '+ getToken() },
                data: project

            }
        }
    }*/
};

const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: PUSHER_APP_CLUSTER,
    useTLS: true,
});

const channel = pusher.subscribe('projects');
channel.bind('inserted', notifyProjectAdd);

export const deleteProject = (id) => {

    return {
        types: ['DELETE_PROJECT_LOAD', 'DELETE_PROJECT_DONE', 'DELETE_PROJECT_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/project/delete',
                headers: { 'Authorization': 'bearer '+ getToken() },
                data: {id: id}

            }
        }
    }
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

export const addTask = (task) => {
    console.log('task', task);


    return {
        types: ['ADD_TASK_LOAD', 'ADD_TASK_DONE', 'ADD_TASK_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/task/add',
                headers: {'Authorization': 'bearer ' + getToken()},
                data: task

            }
        }
    }
};
export const reorderTask = function(project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn) {



    return {
        types: ['REORDER_TASK_LOAD', 'REORDER_TASK_DONE', 'REORDER_TASK_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/task/reorder',
                headers: {'Authorization': 'bearer ' + getToken()},
                data: {project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn}

            }
        }
    }
};











