import {getToken} from "./auth";
import axios from "axios";
import API_URL from "../helpers/api_url";

//action creators
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

export const reorderTasks = (data) => dispatch => {
    let orderType = '';
    if (data.project_id) {
        orderType = 'project';
    } else if (data.user_id) {
        orderType = 'user';
    }

    axios.post(API_URL + `/task/reorder?type=${orderType}`, data, {
        headers: {'Authorization': 'bearer ' + getToken()},

    })
        .then(() => {
            console.log('task reordered');
        })
        .catch(error => {
            console.log(error);
        });

};

export const getAllTasks = () => {

    return {
        types: ['GET_ALL_TASKS_LOAD', 'GET_ALL_TASKS_DONE', 'GET_ALL_TASKS_ERROR'],
        payload: {
            request: {
                method: 'get',
                url: '/tasks'
            }
        }
    }
};
