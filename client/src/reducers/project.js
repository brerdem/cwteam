import produce from 'immer';
import _ from "underscore";

const projectReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECTS_DONE':

            return action.payload.data;
        case 'ADD_PROJECT_DONE':
            return [
                ...state,
                action.payload.data

            ];

        case 'ADD_TASK_DONE':
            return produce(state, draft => {
                const index = state.findIndex(t => t._id === action.payload.data.project_id);
                draft[index].tasks.backlog.push(action.payload.data.item);
            });

        case 'REORDER_TASK_DONE':

            return produce(state, draft => {

                const {project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn} = action.payload.data;

                const index = _.findIndex(state, t => t._id == project_id);

                const project = draft[index];
                const task = project.tasks[sourceColumn][sourceIndex];

                project.tasks[sourceColumn].splice(sourceIndex, 1);
                project.tasks[destinationColumn].splice(destinationIndex, 0, task);
                draft[index] = project;

            });

        case 'DELETE_PROJECT_DONE':
            console.log('payload delete', action.payload);
            return state.filter(element => element._id !== action.payload.data);

        default:
            return state;
    }
};

export default projectReducer;
