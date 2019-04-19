import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Card from '../components/Card'
import SendIcon from '@material-ui/icons/Send';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import SelectPage from '../pages/selector/SelectPage'


const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  {
    kek
  }
`;

class Home extends Component {

    componentDidMount () {
    }

    query () {
      return (
      <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
        {({ data, loading }) => {
          if (loading) {
            return <div>Loading ...</div>;
          }

          return (
            JSON.stringify(data)
          );
        }}
      </Query>
      )
    }

    generate = () => {

    }

    render() {
        const { classes } = this.props;
        return (
          <SelectPage></SelectPage>
        );
    }
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
  });

  Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };  

export default withStyles(styles)(Home);
