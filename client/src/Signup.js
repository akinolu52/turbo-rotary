import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, makeStyles, } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
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
  formButton: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.primary.main,
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  return (
    <AuthLayout>
      <TopAction
        title="Already have an account?"
        buttonText="Login"
        buttonAction={() => history.push("/login")}
      />
      <Box className={classes.formContainer}>
        <Title title="Create an account." />
        <form onSubmit={handleRegister}>
          <Grid>
            <Input
              aria-label="username"
              label="Username"
              name="username"
            />
            <Input
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
            />
            <Input
              aria-label="password"
              label="Password"
              type="password"
              name="password"
              inputProps={{ minLength: 6 }}
            />
            <Box className={classes.buttonContainer}>
              <Button
                title="Create"
                type="submit"
                variant="contained"
                size="large"
                className={classes.formButton}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
