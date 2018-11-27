import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';
import bc from '../images/logo-bc.png';
import {OauthSender} from "react-oauth-flow";

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        padding: theme.spacing.unit * 2,
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
        maxWidth: 600,
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
    }
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
        };

        this.credentials = {
            client: {
                id: '5fccfc8fcf0fa68e8ceab31a5ed7422beb4e1f2b',
                secret: 'ffa278b2c0a9d6b8430b33758899a1f679f9eb04'
            },
            auth: {

                tokenHost: 'https://launchpad.37signals.com/',
                authorizePath: 'authorization/new',
                tokenPath: 'authorization/token'
            }
        }

    }


    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/test/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({responseToPost: body});
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Icon>people</Icon>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            CW Team
                        </Typography>

                        <Button color="primary" variant="outlined" href="https://www.basecamp.com">
                            <LaunchIcon className={classes.leftIcon}/>
                            BASECAMP'E GİT
                        </Button>

                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Login
                        </Typography>
                        <img src={bc} alt="Basecamp" className={classes.img_bc}/>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            Projeleri seçmek için önce Basecamp'e bağlanmalısın.
                        </Typography>

                        //todo move credentials to process.env variables
                        <OauthSender
                            authorizeUrl="https://launchpad.37signals.com/authorization/new?type=web_server"
                            clientId={this.credentials.client.id}
                            redirectUri="https://cwteam.ngrok.io/callback"
                            state={{ from: '/' }}
                            render={({ url }) =>

                                <Button color="primary" size="large" variant="contained" className={classes.marginTopBottom} href={url}>
                                    BAĞLAN
                                </Button>
                            }
                        />

                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            {this.state.responseToPost.express}
                        </Typography>
                    </div>

                </main>

            </React.Fragment>
        )
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
