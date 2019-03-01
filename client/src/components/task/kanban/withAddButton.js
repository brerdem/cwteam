import React, {Component} from 'react';
import Add from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";

const withAddButton = (Wrapped) => {
    class HOC extends Component {
        state = {
            open: false,
            team: this.props.team
        };

        handleClose = () => {
            this.setState({
                open: false,

            })
        };

        handleOpen = () => {
            this.setState({
                open: true
            });


        };

        render() {

            const {open, team} = this.state;
            const {addTask, project, auth} = this.props;


            return (
              <Grid container justify="center" style={{marginTop: 10}}>

                        <Button color="primary" size="medium" onClick={this.handleOpen} variant="contained">
                            <Add style={{marginRight: 8, fontWeight: 200}}/>YENİ BİR İŞ EKLE
                        </Button>




                    <Wrapped open={open} onClose={this.handleClose} team={team} addTask={addTask} project={project} auth={auth} {...this.props} />
                </Grid>

            );
        }


    }

    return HOC;


};

export default withAddButton;
