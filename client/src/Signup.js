import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import Layout from './components/Layout';

const useStyles = makeStyles((theme) => ({
  right: {
    position: 'relative',
    display: 'flex',
    padding: '2rem 6rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHeader: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightHeaderContent: {
    position: "absolute",
    right: '4rem',
    top: '2rem',
    [theme.breakpoints.down('md')]: {
      top: 'unset',
      right: 'unset',
      bottom: '10px'
    },
  },
  button1: {
    padding: '.9rem 4rem 1rem',
    color: '#3A8DFF',
    boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)'
  },
  button2: {
    padding: '.9rem 4rem 1rem',
    color: '#FFF',
    backgroundColor: "#3A8DFF",
    boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)',
    marginTop: '2.2rem'
  },
  mr: {
    marginRight: '1.5rem'
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  input: {
    width: '90%',
  },
  floatingLabelFocusStyle: {
    fontWeight: 'bold',
  }
}));

const Register = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  return (
    <Layout>
      <Box className={classes.rightHeaderContent}>
        <Grid container item className={classes.rightHeader}>
          <Typography className={classes.mr}>Already have an account?</Typography>
          <Button onClick={() => history.push("/login")} className={classes.button1}>Login</Button>
        </Grid>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography className={classes.title}>Create an account.</Typography>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl margin="normal" className={classes.input}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" className={classes.input}>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" className={classes.input}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <div style={{ width: '90%', textAlign: 'center' }}>
              <Button type="submit" variant="contained" size="large" className={classes.button2}>
                Create
              </Button>
            </div>

          </Grid>
        </form>
      </Box>
    </Layout>
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
