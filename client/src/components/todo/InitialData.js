const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Form güncellemeleri', categoryColor: '#9c27b0' },
        'task-2': {id: 'task-2', content: 'Banner çalışması', categoryColor: '#8bc34a'},
        'task-3': {id: 'task-3', content: 'ID sorunu', categoryColor: '#9c27b0'},
        'task-4': {id: 'task-4', content: 'Müşteri onayının alınması ve ilgili birimlere brief verilmesi', categoryColor: '#2196f3'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            columnTitleColor: 'columnTitleRed'
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
            columnTitleColor: 'columnTitleOrange'
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
            columnTitleColor: 'columnTitleGreen'
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
