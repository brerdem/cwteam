import update from 'immutability-helper';
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
           const ids = action.payload.data;
           _.map(ids, function(id, index) {
              let task =  _.findWhere(state, {_id: id});
              update(task, {
                  value: {$set: index}


              });
           });
           return state;

        default:
            return state
    }
}

export default taskReducer
