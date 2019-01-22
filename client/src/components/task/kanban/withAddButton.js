import React, {Component} from 'react';
import Add from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Button from "@material-ui/core/es/Button/Button";

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
                <div>
                    <ListItem>
                        <Button color="primary" size="medium" onClick={this.handleOpen} variant="contained">
                            <Add style={{marginRight: 10}}/>YENİ EKLE
                        </Button>

                    </ListItem>


                    <Wrapped open={open} onClose={this.handleClose} team={team} addTask={addTask} project_id={project._id} auth={auth} {...this.props} />
                </div>

            );
        }


    }

    return HOC;


};

export default withAddButton;
