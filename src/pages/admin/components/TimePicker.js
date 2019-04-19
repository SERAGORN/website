import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  grid: {
    width: '60%',
  },
};

class CustomTimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // The first commit of Material-UI
            selectedDate: this.props.currentDate,
          };
          console.log(this.props.currentDate)
    }


  handleDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.staterFunc({new_date: date})
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            margin="normal"
            label="Date picker"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Time picker"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

CustomTimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTimePicker);