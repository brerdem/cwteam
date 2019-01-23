import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import 'react-circular-progressbar/dist/styles.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/es/TextField/TextField";


const rows = [
    ['Mapfre form validasyon', 12, 4],
    ['Little Caesars Masterpass adres ekleme', 20, 4],
    ['Clockwork web sitesi düzeltmeler', 16, 4],
    ['Craft CMS güncellemeleri', 10, 2],
];

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);


class ZReport extends Component {


    render() {
        const {classes} = this.props;

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        Z-RAPORU
                    </Typography>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>İşin adı</CustomTableCell>
                                    <CustomTableCell align="center">Toplam efor</CustomTableCell>
                                    <CustomTableCell align="center">Günlük ortalama saat</CustomTableCell>
                                    <CustomTableCell align="center">Bugünkü saat</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow className={classes.row} key={row[0]}>
                                        <CustomTableCell component="th" scope="row">
                                            {row[0]}
                                        </CustomTableCell>
                                        <CustomTableCell align="center">{row[1]}</CustomTableCell>
                                        <CustomTableCell align="center">{row[2]}</CustomTableCell>
                                        <CustomTableCell align="center"><TextField
                                            id="standard-name"
type="number"
                                            className={classes.textField}
                                            defaultValue={10}
                                            margin="normal"
                                        /></CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                </div>

            </main>

        )
    }
}

ZReport.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(ZReport);
