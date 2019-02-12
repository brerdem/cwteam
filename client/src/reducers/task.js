const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK_DONE':
            return [
                ...state,
                action.data
            ];

        case 'GET_ALL_TASKS_DONE':
            return action.payload.data;


        default:
            return state
    }
}

export default taskReducer
