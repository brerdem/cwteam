import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import 'react-circular-progressbar/dist/styles.css';


class Library extends Component {
    state = {
        labelWidth: 0,
        loading: false

    };




    render() {
        const {classes} = this.props;

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        BİLGİ BANKASI
                    </Typography>

                </div>

            </main>

        )
    }
}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Library);
