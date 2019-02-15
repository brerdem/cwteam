const getSortedArray = (arr, p_id, stat) => {
    return arr.filter(t => t.status === stat && t.project_id === p_id).sort((a, b) => a.order - b.order);
};

const makeOrdered = (arr) => {
    return arr
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

            const {start, finish, sourceIndex, destinationIndex, task, project_id} = action.payload;
            const projectTasks = state.filter(t => t.project_id === project_id);
            const otherProjectTasks = state.filter(t => t.project_id !== project_id);
            const startTasks = projectTasks.filter(t => t.status === start).sort((a, b) => a.order - b.order);
            const finishTasks = projectTasks.filter(t => t.status === finish).sort((a, b) => a.order - b.order);

            if (start === finish) {

                startTasks.splice(sourceIndex, 1);
                startTasks.splice(destinationIndex, 0, task);
                startTasks.forEach((t, i) => t.order = i);
                const otherTasks = state.filter(t => t.status !== start);
                console.log('tasks -->', otherTasks, startTasks);
                return [...otherProjectTasks, ...otherTasks, ...startTasks];
            }

            const otherTasks = state.filter(t => t.status !== start && t.status !== finish);
            startTasks.splice(sourceIndex, 1);
            finishTasks.splice(destinationIndex, 0, task);
            task.status = finish;
            startTasks.forEach((t, i) => t.order = i);
            finishTasks.forEach((t, i) => t.order = i);
            console.log('startTasks -->', startTasks);
            console.log('finishtasks -->', finishTasks);
            console.log('otherTasks -->', otherTasks);
            return [...otherProjectTasks, ...otherTasks, ...startTasks, ...finishTasks];

        default:
            return state
    }
};

export default taskReducer
