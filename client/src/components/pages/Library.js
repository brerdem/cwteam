import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../styles/Styles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ReactMarkdown from "react-markdown";

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}))(MuiExpansionPanelDetails);






class Library extends Component {
    state = {
        labelWidth: 0,
        loading: false,
        expanded: 'panel1',

    };


    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes} = this.props;
        const { expanded } = this.state;


        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        BİLGİ BANKASI
                    </Typography>

                </div>
                <div>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                        <ExpansionPanelSummary>
                            <Typography variant="h6">CW Team Yönetim Sistemi Giriş</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ReactMarkdown source={'Login bilgileri\n' +
                                '---------------\n' +
                                '\n' +
                                '1.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n' +
                                '    tempor incididunt ut labore et dolore magna aliqua. **Ut enim ad minim\n' +
                                '    veniam**, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n' +
                                '    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit\n' +
                                '    esse cillum dolore\n' +
                                '\n' +
                                'Diğer bilgiler\n' +
                                '--------------\n' +
                                '\n' +
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n' +
                                'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n' +
                                'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
                                'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore\n'}/>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary>
                            <Typography variant="h6">Proje planlama ipuçları</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary>
                            <Typography variant="h6">Temel SEO çalışmaları</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>


            </main>

        )
    }
}

Library.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Library);
