import produce from 'immer';


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



        case 'DELETE_PROJECT_DONE':
            console.log('payload delete', action.payload);
            return state.filter(element => element._id !== action.payload.data);

        default:
            return state;
    }
};

export default projectReducer;
