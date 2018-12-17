import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import bc from '../static/media/logo-bc.png';
import basecamp from "../helpers/auth";
import theme from "../components/styles/Styles";


const Login = function (props) {


    const {classes} = props;
    const authURI = basecamp.authorizeURI + '&client_id=' + basecamp.client_id + '&redirect_uri=' + basecamp.redirect_uri;

    return (

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
                        className={classes.marginTopBottom} href={authURI}>
                    BAĞLAN
                </Button>

            </div>

        </main>

    )

}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Login);
