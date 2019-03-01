import _ from 'lodash';

const getSortedProjectTasks = (arr, p_id, stat) => {
    return _.chain(arr).filter({status: stat, project_id: p_id}).sortBy('order').value();
};

const getSortedUserTasks = (arr, u_id, stat) => {

    //return arr.filter(t => t.status === stat && t.assignees.some(ta => ta.user._id === u_id)).sort((a, b) => a.assignees.find(u => u.user._id === u_id).order - b.assignees.find(u => u.user._id === u_id).order);

    return _.chain(arr).filter({
        status: stat,
        assignees: [{user: {_id: u_id}}]
    }).sortBy(t => _.find(t.assignees, {user: {_id: u_id}}).order).value();
};

const taskReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK_DONE':
            return [
                ...state,
                action.data
            ];

        case 'REMOVE_TASK_DONE':
            return state.filter(t => t._id !== action.id);

        case 'GET_ALL_TASKS_DONE':
            return action.payload.data;

        case 'REORDER_TASK_DONE':

            let temp = _.clone(state);

            const {start, finish, sourceIndex, destinationIndex, task, project_id} = action.payload;
            let startProjectTasks, finishProjectTasks, otherProjectTasks;

            startProjectTasks = getSortedProjectTasks(temp, project_id, start);
            finishProjectTasks = getSortedProjectTasks(temp, project_id, finish);

            if (start === finish) {
                startProjectTasks.splice(sourceIndex, 1);
                startProjectTasks.splice(destinationIndex, 0, task);
                startProjectTasks.forEach((t, i) => t.order = i);

                //todo make difference with lodash
                otherProjectTasks = _.differenceWith(temp, startProjectTasks, _.isEqual);
                //otherProjectTasks = state.filter(t => t.project_id !== project_id && (t.project_id === project_id && t.status !== start));
                console.log('otherProjectTasks -->', otherProjectTasks);
                return [...otherProjectTasks, ...startProjectTasks];
            }
            console.log('task is found: -->', _.find(startProjectTasks, {_id: task._id}));
            startProjectTasks.splice(sourceIndex, 1);
            finishProjectTasks.splice(destinationIndex, 0, task);

            task.status = finish;

            console.log('startProjectTasks -->', startProjectTasks);
            console.log('finishProjectTasks -->', finishProjectTasks);
            startProjectTasks.forEach((t, i) => t.order = i);
            finishProjectTasks.forEach((t, i) => t.order = i);
            //otherProjectTasks = temp.filter(t => t.project_id !== project_id && (t.project_id === project_id && t.status !== start && t.status !== finish && t._id !== task._id ));
            otherProjectTasks = _.differenceWith(temp, [...startProjectTasks, ...finishProjectTasks], _.isEqual);
            otherProjectTasks = otherProjectTasks.filter(t => t._id !== task._id);
            console.log('otherProjectTasks -->', otherProjectTasks);
            return [...otherProjectTasks, ...startProjectTasks, ...finishProjectTasks];

        case 'REORDER_USER_TASK_DONE':

            let startUserTasks, otherUserTasks;

            startUserTasks = getSortedUserTasks(state, action.payload.user_id, action.payload.start);
            console.log('startUserTasks init-->', startUserTasks);
            startUserTasks.splice(action.payload.sourceIndex, 1);
            startUserTasks.splice(action.payload.destinationIndex, 0, action.payload.task);
            console.log('startUserTasks -->', startUserTasks);
            _.forEach(startUserTasks, (t, i) => _.find(t.assignees, {user: {_id: action.payload.user_id}}).order = i);
            otherUserTasks = _.differenceWith(state, startUserTasks, _.isEqual);
            otherUserTasks = otherUserTasks.filter(t => t._id !== action.payload.task._id);
            console.log('otherUserTasks -->', otherUserTasks);
            return [...otherUserTasks, ...startUserTasks];

        default:
            return state
    }
};

export default taskReducer
