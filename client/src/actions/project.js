import {getToken} from "./auth";

//action creators
export const addProject = (project) => {
    console.log(project);

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

export const doGetAllProjects = ()  => {
    return {
        types: ['SET_ALL_PROJECTS_LOAD', 'SET_ALL_PROJECTS_DONE', 'SET_ALL_PROJECTS_ERROR'],
        payload: {
            request: {
                url: '/projects'
            }
        }
    }

};







