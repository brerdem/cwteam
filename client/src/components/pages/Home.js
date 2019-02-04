import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../styles/Styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import menuContent from '../../helpers/menu'
import moment from 'moment';

const DashboardGrid = function (props) {



    const {classes, projects} = props;

    const calculateTotalEffort = (m, t) => {
        return (t.hasOwnProperty('assignees')) ? t.assignees.reduce(calculateTotalEffort, m) : t.effort * t.user.hourly_fee + m;
    };

    let totalCurrentBudgets = 0;
    let totalBudgets = 0;



    projects.map(project => {
        let projectBudget = 0;
        totalBudgets += project.budget;
        Object.keys(project.tasks).forEach(p => {

            projectBudget += project.tasks[p].length > 0 ? project.tasks[p].reduce(calculateTotalEffort, 0) : 0;
        });

        return totalCurrentBudgets += projectBudget;
    });

    return (

        <Grid container spacing={24}>

            <Grid item xs={4}>
                <Paper className={classes.dashboardPaper}>
                    <Grid container spacing={24} direction="column" justify="center" alignItems="center">
                        <Grid item xs={8} className={classes.dashboardHeight}>
                            <CircularProgressbar
                                percentage={67}
                                text={`${67 }%`}
                                className={classes.dashboardProgress}
                            />
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h5" component="h2" color="textPrimary" align="center">
                                Performans
                            </Typography>

                        </Grid>

                        <Grid item>
                            <Typography gutterBottom variant="caption" color="textPrimary" align="center">
                                Performans, bütün projelerdeki biten işlerin, devam eden ya da atanmamış işlere oranıyla
                                elde edilir.
                            </Typography>

                        </Grid>
                    </Grid>

                </Paper>

            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.dashboardPaper}>
                    <Grid container spacing={24} direction="column" justify="center" alignItems="center">
                        <Grid item xs={8} className={classes.dashboardHeight}>
                            <Avatar className={classes.dashboardAvatar}>
                                <Typography variant="h3" color="secondary">
                                    {projects.length > 0 ? projects.reduce(((memo, project) => project.tasks.backlog.length + memo), 0) : 0}
                                </Typography>

                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h5" component="h2" color="textPrimary" align="center">
                                Atanmamış İşler
                            </Typography>

                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="caption" color="textPrimary" align="center">
                                Bütün projelerdeki atanmamış ya da henüz başlamamış işler
                            </Typography>

                        </Grid>
                    </Grid>

                </Paper>

            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.dashboardPaper}>
                    <Grid container spacing={24} direction="column" justify="center" alignItems="center">
                        <Grid item xs={8} className={classes.dashboardHeight}>

                            <Typography variant="h3" style={{
                                marginTop: 40,
                                fontWeight: 600,
                                color: totalBudgets > totalCurrentBudgets ? 'green' : 'red'
                            }}>
                                {totalCurrentBudgets} TL
                            </Typography>


                        </Grid>
                        <Grid item>

                                <Typography gutterBottom variant="h5" color="textPrimary" align="center">
                                    Toplam Maliyet
                                </Typography>


                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="caption" color="textPrimary" align="center">
                                Bütün projelerin bütün işlerinin efor bazında maliyetlerinin toplamı
                            </Typography>

                        </Grid>
                    </Grid>

                </Paper>

            </Grid>


            {menuContent.map((item, index) => (
                <Grid item xs={4} key={index}>
                    <Card className={classes.cardDashboard}>

                        <CardActionArea onClick={() => props.history.push(item.link)}>
                            <CardMedia
                                className={classes.cardmedia}
                                image={`https://www.clockwork.com.tr/mailing/cwteam/${item.img}`}
                                title={item.title}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                                    {item.title}
                                </Typography>
                                <Typography>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
            ))
            }
        </Grid>
    );

};

DashboardGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const DashboardGridWrapper = withStyles(theme)(DashboardGrid);

class Home extends Component {
    state = {
        labelWidth: 0,
        loading: false

    };

    render() {
        const {classes, projects, auth} = this.props;
        console.log('projects from home', projects);

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography variant="h4" align="center" color="primary"
                                className={classes.headingPadding}>
                        Hoş geldiniz, {auth.user.name}
                    </Typography>
                    <Typography variant="h6" align="center" color="primary" gutterBottom style={{marginBottom:20}}>
                        Sisteme en son girişiniz: {moment(auth.user.lastLogin).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                    <DashboardGridWrapper projects={projects} {...this.props}/>

                </div>

            </main>

        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(Home);
