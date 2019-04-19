import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


const CREATE_GROUP = gql`
  mutation createGroup(
    $title_group: String!,
  ) {
    createGroup(
      title_group: $title_group
    ) {
        id_group
        title_group
    }
  }
`;

const styles = theme => ({
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


class GroupsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title_group: "",
            data: this.props.data
        }
    }


    pushGroup = (e) => {
        let dd = this.state.data
        console.log(dd)
        dd.myGroups.push(e.createGroup)
        console.log(dd)
        this.setState({
            data: dd
        })
        return null
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        // this.props.submitData()
    };


    renderGroupRow = (data) => {
        return (
            <Fragment>
                {data.myGroups.map((row) => {
                    return (
                        <div style = {{
                            height: "55px",
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "solid 1px #e0e0e0",
                            padding: "16px",
                            justifyContent: "space-between"
                        }}>
                            {row.title_group}
                            <Button variant="contained" color="red">Удалить</Button>
                        </div>
                    )
                })}
            </Fragment>
        )
    }
    
    render() {
        const classes = this.props
        return (
            <Fragment>
                <Typography gutterBottom variant="h5" component="h2">
                    Мои группы
                </Typography>
                {this.renderGroupRow(this.state.data)}
                <Typography style={{marginTop: 16}} gutterBottom variant="h5" component="h2">
                    Добавить группу
                </Typography>
                <div style={{
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <TextField
                        id="standard-name"
                        label="Название группы"
                        className={classes.textField}
                        
                        value={this.state.title_group}
                        onChange={this.handleChange('title_group')}
                    />

                    <Mutation mutation={CREATE_GROUP}
                        onCompleted={e => this.pushGroup(e)}
                    >
                        {(createGroup, { data }) => (
                            <Button onClick={() =>
                            {
                                let q = {title_group: this.state.title_group}
                                createGroup({ variables: q })
                            }
                            }
                            style={{marginTop: 16}}
                             variant="contained" color="primary" className={classes.button}>
                                Готово
                            </Button>
                        )}
                    </Mutation>
                </div>
            </Fragment>

        )
    }

}

GroupsPage.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  

export default withStyles(styles)(GroupsPage)