import produce from 'immer';
import _ from 'underscore';

const taskReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TASK_DONE':

            return [
                ...state,
                action.payload.data
            ];

        case 'GET_ALL_TASKS_DONE':

            return action.payload.data;

        case 'REORDER_TASK_DONE':

            return produce(state, draft => {
                action.payload.data.forEach((id, index) => {
                    let taskIndex = _.findIndex(draft, (t => t._id === id));
                    draft[taskIndex].order = index;

                });
            });

        default:
            return state;

    }

};

export default taskReducer;
