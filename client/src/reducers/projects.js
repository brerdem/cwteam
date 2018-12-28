const initialState = {
    projects: [],
};


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_PROJECTS_DONE':

            const arr = state.names.concat(action.payload.data);

            return {
                ...state,
                projects: arr,

            };
        case 'ADD_PROJECT_DONE':
            console.log('test');
            return {
                ...state,
                projects: [...state.projects, action.payload.data]

            };
        default:
            return state;
    }
};

export default projectReducer;
