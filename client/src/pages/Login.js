import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import bc from '../static/media/logo-bc.png';
import BasecampAuth from "../components/auth/BasecampAuth";
import Header from "../components/Header";
import theme from "../components/styles/Styles";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
            authURI: BasecampAuth.credentials.authorizeURI + '&client_id=' + BasecampAuth.credentials.client_id + '&redirect_uri=' + BasecampAuth.credentials.redirect_uri
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({responseToPost: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/test/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Header history={this.props.history}/>
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

                        <Typography variant="caption" align="center" color="error" component="p">
                            //todo ID ve secret -> process.env
                        </Typography>


                        <Button color="primary" size="large" variant="contained"
                                className={classes.marginTopBottom} href={this.state.authURI}>
                            BAĞLAN
                        </Button>


                        <Typography variant="h6" align="center" color="primary" component="p">
                            {this.state.responseToPost.express}
                        </Typography>


                    </div>

                </main>

            </React.Fragment>
        )
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Login);
