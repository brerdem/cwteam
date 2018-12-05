import green from '@material-ui/core/colors/green';

export default theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        padding: theme.spacing.unit * 1,
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    heroContent: {
        width: 'auto',
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'start'
    },

    img_bc: {
        width: 150,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0`,

    },
    marginTopBottom: {
        margin: `${theme.spacing.unit * 4}px 0`,
    },
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing.unit * 2,
        },
    },
    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    avatar: {
        marginRight: theme.spacing.unit,
        color: '#fff',
        backgroundColor: '#990000'
    },
    headerRightGrid: {
        width: theme.spacing.unit * 100

    },
    success: {
        backgroundColor: green[600],
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 6}px 0`,
    },
    card: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
    },
    cardDashboard: {
        height: 300,
        display: 'flex',
        flexDirection: 'column',
    },

    cardContent: {
        flexGrow: 1
    },

    cardmedia: {
        height: 169,
    }


});


