import * as types from "./types";


//action creators
export const addProject = (project) => {
    console.log(project);

    return {
        types: ['ADD_PROJECT_LOAD', 'ADD_PROJECT_DONE', 'ADD_PROJECT_ERROR'],
        payload: {
            request: {
                method: 'post',
                url: '/project/add',
                data: project

            }
        }
    }
};


const deleteProject = (id) => ({
    type: types.DELETE_PROJECT,
    id: id
});

const editProject = (id, project) => ({
    type: types.EDIT_PROJECT,
    id: id,
    project: project
});

const getAllProjects = () => ({
    type: types.ALL_PROJECTS

});

const setAllProjects = (projects) => ({
    type: types.SET_ALL_PROJECTS

});


export const doAddProject = (project) => dispatch => {
    dispatch(addProject(project));
};

export const doDeleteProject = (id) => dispatch => {
    dispatch(deleteProject(id));
};

export const doEditProject = (id, project) => dispatch => {
    dispatch(editProject(id, project));
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







