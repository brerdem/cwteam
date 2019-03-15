import green from '@material-ui/core/colors/green';
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";

export default theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.grey[200],
        },
    },
    appBar: {
        position: 'static',
    },
    toolbarTitle: {
        padding: theme.spacing.unit,
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
            width: 1000,
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

    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
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
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },

    cardContent: {
        flexGrow: 1
    },

    cardmedia: {
        height: 169,
    },
    headingPadding: {
        marginBottom: theme.spacing.unit * 3
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),

        fontWeight: 500
    },
    todoBackground: {
        backgroundColor: theme.palette.grey[200]
    },

    columnTitleGreen: {
        backgroundColor: green[400]
    },
    columnTitleOrange: {
        backgroundColor: orange[400]
    },
    columnTitleRed: {
        backgroundColor: red[400]
    },
    avatarSmall: {
        width: 30,
        height: 30,
        fontSize: 14,
        fontWeight: 600,
        color: 'black',
        margin: '0 3px'
    },
    columnItem: {

        padding: 4,

    },

    columnItemDraggingOver: {
        backgroundColor: '#ebebeb',

    },
    columnInner: {
        padding: '10px 0',
        flexGrow: 1,
        minHeight: 300,
        height: '90%'
    },
    dashboardProgress: {
        width: 120,

    },

    dashboardPaper: {
        height: '100%',
        padding: 10

    },
    dashboardHeading: {
        fontSize: 64,
        fontWeight: 500,
        color: red[400]

    },
    dashboardHeight: {
        marginTop:10,
        height: 140

    },
    dashboardAvatar: {
        width: 120,
        height: 120,
        backgroundColor: theme.palette.grey[200]

    },

    todoTabContainer: {
        width: '100%'
    },

    expansionPanel: {
        backgroundColor: theme.palette.grey[100]
    },
    fabButton: {

        position: 'fixed',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,

    },
    userAvatarText: {
        color: '#FFF',
        fontWeight: 600
    },
    userDetailAvatarText: {
        color: '#FFF',
        fontWeight: 600,
        fontSize: 48
    },


    taskInfoText: {
        padding: 0,
        fontSize: 10
    },

    userDetailCard: {

        padding: '10px 10px 0 10px'
    },
    userDetailCardContent: {
        flexGrow: 1,
        padding: 10
    },
    userDetailCardListIcon: {
      paddingRight: 0,
        marginRight: 0
    },

    //user detail header
    cardHeaderBackground: {
        margin: '0 30px',
        borderRadius: 15,
        position: 'relative',
        padding: '5px 0',
        top: 15
    },

     cardHeaderText: {
       color: '#161616',
         fontSize: '1rem'
    },







});


