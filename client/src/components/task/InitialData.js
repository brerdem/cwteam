const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Form güncellemeleri', categoryColor: '#9c27b0' },
        'task-2': {id: 'task-2', content: 'Banner çalışması', categoryColor: '#8bc34a'},
        'task-3': {id: 'task-3', content: 'ID sorunu', categoryColor: '#9c27b0'},
        'task-4': {id: 'task-4', content: 'Müşteri onayının alınması ve ilgili birimlere brief verilmesi', categoryColor: '#2196f3'},
    },
    columns: {
        'backlog': {
            id: 'backlog',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            columnTitleColor: 'columnTitleRed'
        },
        'progress': {
            id: 'progress',
            title: 'In Progress',
            taskIds: [],
            columnTitleColor: 'columnTitleOrange'
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: [],
            columnTitleColor: 'columnTitleGreen'
        },
    },
    columnOrder: ['backlog', 'progress', 'done'],
};

export default initialData;
