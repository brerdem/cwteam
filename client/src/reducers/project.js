const initialState = [];


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECTS_DONE':

            return action.payload.data;
        case 'ADD_PROJECT_DONE':
            return [
                ...state,
                action.payload.data

            ];


        case 'DELETE_PROJECT_DONE':
            console.log('payload delete', action.payload);
            return state.filter(element => element._id !== action.payload.data);

        default:
            return state;
    }
};

export default projectReducer;
