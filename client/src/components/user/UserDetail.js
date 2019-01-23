import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import UserAvatar from 'react-user-avatar';
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import theme from '../../components/styles/Styles';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/es/Grid/Grid";
import Divider from "@material-ui/core/es/Divider/Divider";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import Icon from "@material-ui/core/es/Icon/Icon";
import {Chart} from "react-google-charts";

const data = [
    ["Element", "Saat", {role: "style"}, {role: 'annotation'}],
    ["Pt", 4, "#b87333", '4'],
    ["Sa", 5, "#b87333", '5'], // RGB value
    ["Ça", 4, "silver", '4'], // English color name
    ["Pe", 6, "gold", '6'],
    ["Cu", 3, "color: #e5e4e2", '3'],

];

class UserDetail extends Component {

    componentDidMount() {

    }

    render() {
        const {classes, users, match, loading} = this.props;

        const user = users.find(u => u._id === match.params.id);

        let content;
        if (loading) {
            content = <CircularProgress className={classes.progress} color="secondary"/>
        } else {
            content =
                <Grid container alignItems="center" direction="column"><UserAvatar className={classes.userAvatarText}
                                                                                   size={140}
                                                                                   name={user.name}
                                                                                   src={user.avatar_url ? `http://www.clockwork.com.tr/mailing/users/${user.avatar_url}.png` : null}/>

                    <Typography variant="h4" align="center" color="primary" className={classes.headingPadding}
                                style={{margin: '20px 0 8px 0'}}>
                        {user.name}
                    </Typography>

                    <Divider style={{border: 'solid 1px #e4e4e4', width: 120,}} variant="fullWidth"/>

                    <Typography variant="h6" align="center" className={classes.headingPadding}
                                style={{color: 'gray', fontWeight: 100}}>
                        {user.title}
                    </Typography>

                    <Grid container direction="row" alignItems="center" spacing={24} style={{marginTop: 20}}>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="center" style={{color: 'gray'}} gutterBottom>İş Durumu
                            </Typography>
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
                            <Typography variant="h6" align="center" gutterBottom style={{color: 'gray'}}>
                                Bulunduğu Projeler
                            </Typography>
                            <Card className={classes.userDetailCard}>

                                <CardContent className={classes.userDetailCardContent}>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemText
                                            primary="Mapfre Sigorta"
                                            secondary="12 iş"
                                        />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemText
                                            primary="Little Caesars"
                                            secondary="5 iş"
                                        />
                                    </ListItem>
                                    <Divider/>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <ListItemText
                                            primary="Electrip Uygulaması"
                                            secondary="2 iş"
                                        />
                                    </ListItem>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" align="center" gutterBottom style={{color: 'gray'}}>
                                Çalışma Süresi
                            </Typography>
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

                        <Grid item xs={4}>
                            <Typography variant="h6" align="center" gutterBottom style={{color: 'gray'}}>
                                Muhasebe
                            </Typography>
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
                                    <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                    >money</Icon></ListItemIcon>
                                    <ListItemText
                                        primary="Şu anki aylık masraf"
                                        secondary="2.430 TL"
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start" disableGutters>
                                    <ListItemIcon className={classes.userDetailCardListIcon}><Icon
                                    >local_hotel</Icon></ListItemIcon>
                                    <ListItemText
                                        primary="Kalan izin"
                                        secondary="12 gün"
                                    />
                                </ListItem>
                            </CardContent>

                            </Card>
                        </Grid>
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
