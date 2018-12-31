const initialState = [];


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_PROJECTS_DONE':

            const arr = state.projects.concat(action.payload.data);

            return {
                ...state,
                projects: arr,

            };
        case 'ADD_PROJECT_DONE':
            console.log('payload ',action.payload);
            return [
                ...state,
               action.payload.data

            ];
        default:
            return state;
    }
};

export default projectReducer;
