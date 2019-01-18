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
            console.log('type:' + action.type, 'item:' + action.item);
            return produce(state, draft => {
                const index = state.findIndex(t => t._id === action.project_id);
                const project = draft[index];
                project.tasks.backlog = action.item;
                draft[index] = project;
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
            console.log('project reducer tasks', action.tasks);

            const project = state.find(t => t._id === action.project_id);
            const excluded = state.filter(t => t._id !== action.project_id);
            console.log(state.length, excluded.length);
            project.tasks = action.tasks;
            return [
                ...excluded,
                project
            ];

            //todo why immer doesn't work here? investigate
        /*  return produce(state, draft => {

                const index = state.findIndex(t => t._id === action.project_id);
                draft[index].tasks = action.tasks;
                return draft;


            });*/

        case 'DELETE_PROJECT_DONE':
            return state.filter(element => element._id !== action.id);

        default:
            return state;
    }
};

export default projectReducer;
