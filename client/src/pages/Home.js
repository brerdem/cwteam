import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import theme from "../components/styles/Styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Avatar from "@material-ui/core/es/Avatar/Avatar";

const DashboardGrid = function (props) {

    const cardsContent = [
        {title: "Projeler", link: "/projects", description: "Projeler ve detayları", img: "projects.png"},
        {
            title: "İşler",
            link: "/tasks/kanban",
            description: "İşlerin durum gösterimleri ve atamalar",
            img: "todos.png"
        },
        {title: "Kullanıcılar", link: "/users", description: "Kullanıcılar ilgili bilgi, işler", img: "users.png"},
        {title: "Bilgi Bankası", link: "/", description: "Yararlı bilgiler", img: "knowledgebase.png"},
        {title: "Şifreler", link: "/users", description: "Grup bazlı şifreler", img: "passwords.png"},
        {title: "Muhasebe", link: "/users", description: "Muhasebe hesaplamaları, işlemler", img: "accounting.png"},
    ];

    const {classes, projects} = props;
    return (

        <Grid container spacing={24}>

            <Grid item xs={4}>
                <Paper className={classes.dashboardPaper}>
                    <Grid container spacing={24} direction="column" justify="center" alignItems="center">
                        <Grid item xs={8} className={classes.dashboardHeight}>
                            <CircularProgressbar
                                percentage={61}
                                text={`${61}%`}
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
                                Atanmamış İş
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

                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h5" component="h2" color="textPrimary" align="center">
                                Diğer
                            </Typography>

                        </Grid>
                        <Grid item>


                        </Grid>
                    </Grid>

                </Paper>

            </Grid>


            {cardsContent.map((item, index) => (
                <Grid item xs={4} key={index}>
                    <Card className={classes.cardDashboard}>

                        <CardActionArea onClick={() => props.history.push(item.link)}>
                            <CardMedia
                                className={classes.cardmedia}
                                image={require(`../static/media/${item.img}`)}
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
        const {classes, projects} = this.props;
        console.log('projects from home', projects);

        return (

            <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="primary"
                                className={classes.headingPadding}>
                        DASHBOARD
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
