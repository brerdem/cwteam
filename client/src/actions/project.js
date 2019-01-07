import {getToken} from "./auth";

//action creators
export const addProject = (project) => {
    console.log('project', project);


    return {
        types: ['ADD_PROJECT_LOAD', 'ADD_PROJECT_DONE', 'ADD_PROJECT_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/project/add',
                headers: { 'Authorization': 'bearer '+ getToken() },
                data: project

            }
        }
    }
};

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









