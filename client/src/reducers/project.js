

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

      /*  case 'FILTER_TASKS_DONE':
            console.log('type:' + action.type, 'item:' + action.item);
            return produce(state, draft => {

                draft.forEach(t => {
                    Object.keys(t.tasks).forEach(m => {
                        t.tasks[m].map((k => k.show = action.selectedDepartments.includes(k.department)));
                    });
                });

            });
*/

        case 'DELETE_PROJECT_DONE':
            return state.filter(element => element._id !== action.id);

        default:
            return state;
    }
};

export default projectReducer;
