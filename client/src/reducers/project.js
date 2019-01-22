import produce from 'immer';

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

        case 'ADD_TASK_DONE':
            return produce(state, draft => {
                const index = draft.findIndex(t => t._id === action.project_id);
                draft[index].tasks.backlog.push(action.insertedTask);

            });
        case 'FILTER_TASKS_DONE':
            console.log('type:' + action.type, 'item:' + action.item);
            return produce(state, draft => {

                draft.forEach(t => {
                    Object.keys(t.tasks).forEach(m => {
                        t.tasks[m].map((k => k.show = action.selectedDepartments.includes(k.department)));
                    });
                });

            });


        case 'REORDER_TASK_DONE':

            return produce(state, draft => {

                const project = draft.find(t => t._id === action.payload.project_id);

                project.tasks[action.payload.start].splice(action.payload.sourceIndex, 1);
                project.tasks[action.payload.finish].splice(action.payload.destinationIndex, 0, action.payload.task);

            });

        case 'DELETE_PROJECT_DONE':
            return state.filter(element => element._id !== action.id);

        default:
            return state;
    }
};

export default projectReducer;
