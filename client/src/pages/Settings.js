import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import 'react-circular-progressbar/dist/styles.css';
import Paper from "@material-ui/core/es/Paper/Paper";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/es/Switch/Switch";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";

const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
    },
    {
        value: 'BTC',
        label: 'BTC',
    },
    {
        value: 'TL',
        label: 'TL',
    },
];

class Settings extends Component {
    state = {
        labelWidth: 0,
        loading: false,
        currency: 'TL',
        gilad: true,
        jason: false,
        antoine: true,

    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    handleMenuChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        AYARLAR
                    </Typography>
                    <Paper style={{padding: 20}}>
                        <Grid container direction="row">
                            <Grid item>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Bildirimler</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.gilad}
                                                    onChange={this.handleChange('gilad')}
                                                    value="gilad"
                                                />
                                            }
                                            label="Browser"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.jason}
                                                    onChange={this.handleChange('jason')}
                                                    value="jason"
                                                />
                                            }
                                            label="Slack"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.antoine}
                                                    onChange={this.handleChange('antoine')}
                                                    value="antoine"
                                                />
                                            }
                                            label="Facebook Messenger"
                                        />
                                    </FormGroup>

                                </FormControl>
                            </Grid>

                            <Grid item style={{borderLeft: '2px solid #cecece', paddingLeft: 20}}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Sistem</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.gilad}
                                                    onChange={this.handleChange('gilad')}
                                                    value="gilad"
                                                />
                                            }
                                            label="Koyu Tema"
                                        />
                                        <FormControl className={classes.formControl}>
                                            <TextField
                                                id="standard-select-currency-native"
                                                select
                                                label="Para birimi"
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={this.handleMenuChange('currency')}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </FormGroup>

                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>


                </div>

            </main>

        )
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Settings);
