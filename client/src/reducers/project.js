import produce from 'immer';
import _ from "underscore";

//todo get rid of produce functions and use spread op

const projectReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECTS_DONE':

            return action.payload.data;
        case 'ADD_PROJECT_DONE':
            return [
                ...state,
                action.project

            ];
//fixme add task
        case 'ADD_TASK_DONE':
            console.log('type:'+action.type, 'item:'+action.item);
            return produce(state, draft => {
                const index = state.findIndex(t => t._id == action.project_id);
                const project = draft[index];
                project.tasks.backlog = action.item;
                draft[index] = project;
            });

        case 'REORDER_TASK_CLIENT':

            return produce(state, draft => {

                const {project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn} = action;

                const index = _.findIndex(state, t => t._id == project_id);

                const project = draft[index];
                const task = project.tasks[sourceColumn][sourceIndex];

                project.tasks[sourceColumn].splice(sourceIndex, 1);
                project.tasks[destinationColumn].splice(destinationIndex, 0, task);
                draft[index] = project;

            });
            case 'REORDER_TASK_DONE':

            return produce(state, draft => {

                const index = _.findIndex(state, t => t._id == action.project_id);
                const project = draft[index];
                project.tasks = action.tasks;
                draft[index] = project;

            });

        case 'DELETE_PROJECT_DONE':
            return state.filter(element => element._id !== action.id);

        default:
            return state;
    }
};

export default projectReducer;
