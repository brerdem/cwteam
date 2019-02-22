import _ from 'lodash';

const getSortedProjectTasks = (arr, p_id, stat) => {
    return _.chain(arr).filter({status: stat, project_id: p_id}).sortBy('order').value();
};

const getSortedUserTasks = (arr, u_id, stat) => {

    //return arr.filter(t => t.status === stat && t.assignees.some(ta => ta.user._id === u_id)).sort((a, b) => a.assignees.find(u => u.user._id === u_id).order - b.assignees.find(u => u.user._id === u_id).order);

    return _.chain(arr).filter({status: stat, assignees: [{user: {_id: u_id}}]}).sortBy(t => _.find(t.assignees, {user: {_id: u_id}}).order).value();
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
            let startProjectTasks, finishProjectTasks, otherProjectTasks;

            startProjectTasks = getSortedProjectTasks(state, project_id, start);
            finishProjectTasks = getSortedProjectTasks(state, project_id, finish);
            startProjectTasks.splice(sourceIndex, 1);
            if (start === finish) {

                startProjectTasks.splice(destinationIndex, 0, task);
                startProjectTasks.forEach((t, i) => t.order = i);
                otherProjectTasks = _.difference(state, startProjectTasks);
                return [...otherProjectTasks, ...startProjectTasks];
            }

            finishProjectTasks.splice(destinationIndex, 0, task);
            task.status = finish;
            otherProjectTasks = _.difference(state, [...startProjectTasks, ...finishProjectTasks]);
            startProjectTasks.forEach((t, i) => t.order = i);
            finishProjectTasks.forEach((t, i) => t.order = i);

            return [...otherProjectTasks, ...startProjectTasks, ...finishProjectTasks];

        case 'REORDER_USER_TASK_DONE':

            let startUserTasks, otherUserTasks;

            startUserTasks = getSortedUserTasks(state, action.payload.user_id, action.payload.start);
            console.log('startUserTasks init-->', startUserTasks);
            startUserTasks.splice(action.payload.sourceIndex, 1);
            startUserTasks.splice(action.payload.destinationIndex, 0, action.payload.task);
            console.log('startUserTasks -->', startUserTasks);
            _.forEach(startUserTasks, (t, i) => _.find(t.assignees, {user: {_id: action.payload.user_id}}).order = i);
            otherUserTasks = _.difference(state, startUserTasks);
            console.log('otherUserTasks -->', otherUserTasks);
            return [...otherUserTasks, ...startUserTasks];

        default:
            return state
    }
};

export default taskReducer
