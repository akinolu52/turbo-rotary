import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Typography, InputAdornment, makeStyles } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { AuthLayout, Button, TopAction, Title, Input } from './components/Layout';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flex: 0,
      width: '95%',
    },
  },
  buttonContainer: {
    width: '90%',
    textAlign: 'center',
    marginTop: '2.2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  button: {
    color: '#FFF',
    backgroundColor: "#3A8DFF",
  },
  labelFocusStyle: {
    fontWeight: 'bold',
    color: 'gray'
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  return (
    <AuthLayout>
      <TopAction
        title="Dont have an account?"
        buttonText="Create account"
        buttonAction={() => history.push("/register")}
      />
      <Box className={classes.formContainer}>
        <Title title="Welcome back!" />

        <form onSubmit={handleLogin}>
          <Grid>
            <Input
              aria-label="username"
              label="Username"
              name="username"
            />
            <Input
              aria-label="password"
              label="Password"
              type="password"
              name="password"
              inputProps={{ minLength: 6 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' className={classes.labelFocusStyle}>
                    <Typography>Forgot Password?</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <Box className={classes.buttonContainer}>
              <Button
                title="Login"
                type="submit"
                variant="contained"
                size="large"
                className={classes.button}
              />
            </Box>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
