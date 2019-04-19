import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CustomTimePicker from './TimePicker'
import MutationSubmitButton from './MutationSubmitButtonMutation'

const styles = theme => ({
    container: {
        width: 400,
        background: 'white',
        zIndex:2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "calc(100% - 16px)",
    },

    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class EditEventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            location: "",
            date: "",
            start: "",
            end: "",
            new_date: "",
            mutation_data: "" 
        }
    }



    close = () => this.props.parentStater({add_modal_visible: false})

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        // this.props.submitData()
    };

    renderForm () {
        const classes = this.props
        return (
            <Fragment>
                <div style={{
                    padding: "16px",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    letterSpacing: ".02em",
                    lineHeight: 1.4,
                }}>Изменить событие</div>
                <TextField
                    id="standard-name"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                />
                <TextField
                    id="standard-name"
                    label="Description"
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Location"
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange('location')}
                    margin="normal"
                />
            </Fragment>
        )
    }

    renderButtons() {
        const classes = this.props
        return (
            <div style = {{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                padding: "16px"
            }}>
                <Button onClick={()=>this.close()} variant="contained" className={classes.button}>
                    Отмена
                </Button>
                <Button onClick={()=>alert("kek")}>Изменить</Button>
            </div>
        )
    }


    render() {
        const classes = this.props
        return (
            <div
                style = {
                    {
                        width: 400,
                        background: 'white',
                        zIndex:2,
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "column"
                    }
                }
                >
                {this.renderForm()}
                {/* {JSON.stringify(this.props.data)} */}

                {this.renderButtons()}
            </div>
        )
    }
}

EditEventModal.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  

export default withStyles(styles)(EditEventModal)