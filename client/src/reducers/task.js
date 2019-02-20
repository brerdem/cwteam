const getSortedProjectTasks = (arr, p_id, stat) => {
    return arr.filter(t => t.status === stat && t.project_id === p_id).sort((a, b) => a.order - b.order);
};

const getSortedUserTasks = (arr, u_id, stat) => {
    return arr.filter(t => t.status === stat && t.assignees.some(ta => ta.user._id === u_id)).sort((a, b) => a.assignees.find(u => u.user._id === u_id).order - b.assignees.find(u => u._id === u_id).order);
};

const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK_DONE':
            return [
                ...state,
                action.data
            ];

        case 'GET_ALL_TASKS_DONE':
            return action.payload.data;

        case 'REORDER_TASK_DONE':

            const {start, finish, sourceIndex, destinationIndex, task, project_id, user_id} = action.payload;
            let startTasks, finishTasks, otherTasks;


            startTasks = project_id ? getSortedProjectTasks(state, project_id, start): getSortedUserTasks(state, user_id, start);
            finishTasks = project_id ? getSortedProjectTasks(state, project_id, finish): getSortedUserTasks(state, user_id, finish);
            startTasks.splice(sourceIndex, 1);
            if (start === finish) {

                startTasks.splice(destinationIndex, 0, task);
                startTasks.forEach((t, i) => project_id ? t.order = i : t.assignees.find(u => u.user._id === user_id).order = i);
                otherTasks = state.filter(t => (project_id ? t.project_id !== project_id: !t.assignees.some(u => u.user._id === user_id) && t.status !== start));
                console.log('tasks -->', otherTasks, startTasks);
                return [...otherTasks, ...startTasks];
            }

            otherTasks = state.filter(t => (project_id ? t.project_id !== project_id : !t.assignees.some(u => u.user._id === user_id) && t.status !== start && t.status !== finish));
            finishTasks.splice(destinationIndex, 0, task);
            task.status = finish;
            startTasks.forEach((t, i) => project_id ? t.order = i : t.assignees.find(u => u.user._id === user_id).order = i);
            finishTasks.forEach((t, i) => project_id ? t.order = i : t.assignees.find(u => u.user._id === user_id).order = i);

            return [...otherTasks, ...startTasks, ...finishTasks];

        case 'REORDER_USER_TASK_DONE':




        default:
            return state
    }
};

export default taskReducer
