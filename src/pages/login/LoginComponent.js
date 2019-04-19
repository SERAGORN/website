import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {Redirect} from "react-router-dom";

import gql from 'graphql-tag';

import { Mutation } from 'react-apollo';

const MUTATION_AUTH = gql`
  mutation authentication(
    $login: String!,
    $password: String!
  ) {
    authentication(
      login: $login,
      password: $password,
    ) {
      login
      password
      id
      token
    }
  }
`;




const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignIn extends React.Component {

  state = {
    login : "",
    password : "",
    redirect: false
  }

  actionOn = (e) => {
    if (e.authentication.token) {
      localStorage.setItem('token', e.authentication.token)
      this.setState({
        redirect: true
      })
      window.location.pathname = "/website/admin/"
    } else {
      alert("Не правильный логин или пароль") 
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        {this.state.redirect && <Redirect to={{pathname: "/website/admin/"}} ></Redirect>}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Электронная почта</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange = {(e) => this.setState({login: e.target.value})} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange = {(e) => this.setState({password: e.target.value})}  />
            </FormControl>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Mutation mutation={MUTATION_AUTH}
            onCompleted={e=>this.actionOn(e)}>
                {(authentication, { data }) => (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {()=>authentication({
                      variables: {
                        login: this.state.login,
                        password: this.state.password
                      }
                    })}
                  >Войти</Button>
                )}
            </Mutation>
          </form>
        </Paper>
      </main>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);