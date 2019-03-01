import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../styles/Styles";
import 'react-circular-progressbar/dist/styles.css';

class Gallery extends Component {
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
                        MEDYA GALERİ
                    </Typography>

                    <Typography variant="h6" align="center" color="primary"
                                className={classes.headingPadding}>
                       Foto ve video galerisi
                    </Typography>

                </div>

            </main>

        )
    }
}

Gallery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Gallery);
