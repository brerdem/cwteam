import {getToken} from "./auth";

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
}
