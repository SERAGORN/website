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
      marginLeft: '50px',
      marginRight: theme.spacing.unit,
      width: "calc(100% - 32px)",
    },

    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class AddEventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            location: "",
            date: this.props.data.start,
            start: "",
            end: "",
            new_date: "",
            mutation_data: "" 
        }
    }


    componentDidMount () {
        this.parseEvent()
    }

    staterFunc = obj => {
        this.setState(obj)
    }

    submitData = () => {
        this.setState({
            mutation_data: {
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                start: this.state.start,
                end: this.state.end
            }
        })
    }

    parseEvent () {
        let start = this.props.data.start
        let start_obj = {
            year: start.getFullYear(),
            month: start.getMonth(),
            day: start.getDate(),
            hour: start.getHours(),
            minute: start.getMinutes(),
            second: "00"
        }
        let end = this.props.data.end
        let end_obj = {
            year: end.getFullYear(),
            month: end.getMonth(),
            day: end.getDate(),
            hour: end.getHours(),
            minute: end.getMinutes(),
            second: "00"
        }
        this.setState({
            start: start_obj,
            end: end_obj
        })
    }

    close = () => this.props.parentStater({add_modal_visible: false})

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        this.submitData()
    };

    renderForm () {
        const classes = this.props
        return (
            <div
                className="input-add"
            >
                <div style ={{
                    padding: "16px",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    letterSpacing: ".02em",
                    lineHeight: 1.4,
                }}>
                    Добвить событие
                </div>
                <div
                    style = {{
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        width: "calc(100% - 32px)",
                    }}
                >

                <TextField
                    id="standard-name"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                    margin="normal"
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
                </div>
                {/* <CustomTimePicker currentDate = {this.state.date} staterFunc = {this.staterFunc}/> */}
            </div>
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
                <MutationSubmitButton id_group = {this.props.id_group} close = {this.close} pushEvent = {this.props.pushEvent} refetch = {this.props.refetch} mutation_data = {this.state.mutation_data}/>
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

AddEventModal.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  

export default withStyles(styles)(AddEventModal)