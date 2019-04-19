import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
// title_event: String,
// start_time: String,
// id_group: String,
// end_time: String, 
// description: String,
// location: String


const MUTATION_SUBMIT = gql`
  mutation createEvent(
    $title_event: String!,
    $start_time: String!,
    $id_group: String!,
    $end_time: String!,
    $description: String!,
    $location: String!
  ) {
    createEvent(
      title_event: $title_event,
      start_time: $start_time,
      id_group: $id_group,
      end_time: $end_time,
      description: $description,
      location: $location
    ) {
      id_event
      title_event
      description
      start_time
      location
      end_time
      id_group
    }
  }
`;

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

class SubmitButtonMutation extends Component {

    constructor(props) {
      super(props) 
      this.state = {
        data: this.props.mutation_data
      }
    }

    componentDidMount () {
    }

    toTwoString = num => {
      let str = num.toString(),
          res
      if (str.length === 1) {
          res = "0" + str
          return res
      } else {
        return str
      }
    }

    filterDate = (data) => {
      // let  = {
      //   start:
      //     {
      //           day: 10,
      //           hour: 3,
      //           minute: 0,
      //           month: 3,
      //           second: "00",
      //           year: 2019
      //     }
      // }
      //20190401T211100
      let newStartDate = data.start.year + 
      this.toTwoString(data.start.month+1) + 
      this.toTwoString(data.start.day) + "T" + 
      this.toTwoString(data.start.hour) + 
      this.toTwoString(data.start.minute) +
      data.start.second
      let newEndDate = data.end.year + 
      this.toTwoString(data.end.month+1) + 
      this.toTwoString(data.end.day) + "T" + 
      this.toTwoString(data.end.hour) + 
      this.toTwoString(data.end.minute) +
      data.end.second

      let res = {
        title_event: data.title,
        start_time: newStartDate,
        end_time: newEndDate,
        id_group: this.props.id_group,
        description: data.description,
        location: data.location
      }
      // description: "asd"
      // end: {year: 2019, month: 3, day: 10, hour: 2, minute: 0, …}
      // location: "as"
      // start: {year: 2019, month: 3, day: 10, hour: 1, minute: 30, …}
      // title: "asd"

      // title_event: $title_event,
      // start_time: $start_time,
      // id_group: $id_group,
      // end_time: $end_time,
      // description: $description,
      // location: $location

      console.log(data)
      return res
    }

    renderButton () {
        const classes = this.props
        return (
          <Mutation mutation={MUTATION_SUBMIT}
            onCompleted={e=>this.props.pushEvent(e.createEvent)}
          >
          {(createEvent, { data }) => (
            <Button onClick={()=>
            // createEvent({ variables: { data: "lol" } })
            {
              let q = this.filterDate(this.props.mutation_data)
              // this.props.refetch()
              // this.props.pushEvent(q)
              createEvent({variables: q})
              return this.props.close()
            }
            } variant="contained" color="primary" className={classes.button}>
                Готово
            </Button>
          )}
          </Mutation>
        )
    }



    render() {
        return this.renderButton()
    }
}

SubmitButtonMutation.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  

export default withStyles(styles)(SubmitButtonMutation)