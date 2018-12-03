import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Header from "../components/Header";
import theme from "../components/Styles";


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',

            labelWidth: 0,


        };
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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
                            Projeni Seç
                        </Typography>
                        <FormControl className={classes.formControl}>

                            <Select
                                value={this.state.project}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'project',
                                    id: 'project-name'
                                }}

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>MAPFRE</MenuItem>
                                <MenuItem value={20}>McDonald's</MenuItem>
                                <MenuItem value={30}>TEMSA</MenuItem>
                            </Select>
                        </FormControl>


                    </div>

                </main>

            </React.Fragment>
        )
    }
}


Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Projects);
