const columnInfo = {
    columns: {
        'backlog': {
            id: 'backlog',
            title: 'Backlog',
            columnTitleColor: 'columnTitleRed',
        },
        'progress': {
            id: 'progress',
            title: 'In Progress',
            columnTitleColor: 'columnTitleOrange',
        },
        'done': {
            id: 'done',
            title: 'Done',
            columnTitleColor: 'columnTitleGreen',
        },
    },
    columnOrder: ['backlog', 'progress', 'done'],

};

export default columnInfo;
