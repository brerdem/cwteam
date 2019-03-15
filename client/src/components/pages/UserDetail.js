import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import UserAvatar from 'react-user-avatar';
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import theme from '../styles/Styles';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/es/Grid/Grid";
import Divider from "@material-ui/core/es/Divider/Divider";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import {AccountClock, CashMultiple} from 'mdi-material-ui'
import Icon from "@material-ui/core/es/Icon/Icon";
import {Chart} from "react-google-charts";
import Board from "../task/kanban/Board";
import Paper from "@material-ui/core/Paper";
import _ from 'lodash'
import indigo from "@material-ui/core/es/colors/indigo";
import purple from "@material-ui/core/es/colors/purple";
import cyan from "@material-ui/core/es/colors/cyan";
import teal from "@material-ui/core/es/colors/teal";


const styles = {

};

const data = [
    ["Element", "Saat", {role: "style"}, {role: 'annotation'}],
    ["Pt", 4, "#b87333", '4'],
    ["Sa", 5, "#b87333", '5'], // RGB value
    ["Ça", 4, "silver", '4'], // English color name
    ["Pe", 6, "gold", '6'],
    ["Cu", 3, "color: #e5e4e2", '3'],

];

class UserDetail extends Component {

    render() {
        const {classes, users, match, loading, tasks, reorderTasks, socket_id} = this.props;

        const user = users.find(u => u._id === match.params.id);

        let content;
        if (loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =

                <Grid container alignItems="center" direction="column" style={{marginTop: 150}}>

                    <div
                        style={{borderRadius: '50%', width: 200, height: 200, backgroundColor: '#eeeeee', padding: 10}}>
                        <UserAvatar className={classes.userDetailAvatarText}
                                    size={180}
                                    name={user.name}
                                    src={user.avatar_url ? `/img/users/${user.avatar_url}.jpg` : null}/></div>

                    <Typography variant="h4" align="center" color="primary" className={classes.headingPadding}
                                style={{margin: '20px 0 8px 0'}}>
                        {user.name}
                    </Typography>

                    <Typography variant="h6" align="center" className={classes.headingPadding}
                                style={{color: 'gray', fontWeight: 100}}>
                        {user.title}
                    </Typography>

                    <Grid container direction="row" alignItems="center" spacing={24} style={{marginTop: 20}}>
                        <Grid item xs={4}>


                            <div className={classes.cardHeaderBackground} style={{backgroundColor: indigo[200]}}><Typography variant="h6" align="center" className={classes.cardHeaderText}>İş
                                Durumu</Typography></div>
                            <Card className={classes.userDetailCard}>

                                <CardContent className={classes.userDetailCardContent}>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                            style={{color: 'green'}}>arrow_upward</Icon></ListItemIcon>
                                        <ListItemText
                                            primary="Mapfre form yayını"
                                            secondary="%67"
                                        />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                            style={{color: 'green'}}>arrow_upward</Icon></ListItemIcon>
                                        <ListItemText
                                            primary="Little Caesars güncelleme"
                                            secondary="%43"
                                        />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                            style={{color: 'red'}}>arrow_downward</Icon></ListItemIcon>
                                        <ListItemText
                                            primary="Master Pass"
                                            secondary="%12"
                                        />
                                    </ListItem>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.cardHeaderBackground} style={{backgroundColor: purple[200]}}><Typography variant="h6" align="center" className={classes.cardHeaderText}>Muhasebe</Typography></div>
                            <Card className={classes.userDetailCard}> <CardContent
                                className={classes.userDetailCardContent}>

                                <ListItem alignItems="flex-start" disableGutters>
                                    <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                    >monetization_on</Icon></ListItemIcon>
                                    <ListItemText
                                        primary="Verilen Maaş"
                                        secondary="3.000 TL"
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start" disableGutters>
                                    <ListItemIcon className={classes.userDetailCardListIcon}><CashMultiple /></ListItemIcon>
                                    <ListItemText
                                        primary="Şu anki aylık masraf"
                                        secondary="2.430 TL"
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start" disableGutters>
                                    <ListItemIcon className={classes.userDetailCardListIcon}><AccountClock/></ListItemIcon>
                                    <ListItemText
                                        primary="Adam/Saat Fiyatı"
                                        secondary="100 TL"
                                    />
                                </ListItem>
                            </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.cardHeaderBackground} style={{backgroundColor: teal[200]}}><Typography variant="h6" align="center" className={classes.cardHeaderText}>Çalışma Süresi</Typography></div>
                            <Card className={classes.userDetailCard}>

                                <CardContent className={classes.userDetailCardContent}>
                                    <Chart
                                        chartType="ColumnChart"
                                        width="100%"
                                        height="200px"
                                        data={data}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>


                    </Grid>

                    <Grid container style={{marginTop: 30}}>
                        <Paper style={{width: '100%', padding: '10px 10px 52px 10px'}}>
                            <Board
                                tasks={_.chain(tasks).filter({assignees: [{user: {_id: user._id}}]}).sortBy(t => _.find(t.assignees, {user: {_id: user._id}}).order).value()}
                                user={user}
                                reorderTasks={reorderTasks}
                                socket_id={socket_id}


                            />
                        </Paper>
                    </Grid>

                </Grid>

        }

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>

                    {content}

                </div>

            </main>

        )
    }
}

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(UserDetail);
