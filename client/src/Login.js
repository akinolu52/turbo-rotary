import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import Layout from './components/Layout';

const useStyles = makeStyles(() => ({
  right: {
    // height: '100%',
    position: 'relative',
    display: 'flex',
    // flexDirection: "column",
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
    top: '2rem'
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
    // marginBottom: '1.1rem',
  },
  floatingLabelFocusStyle: {
    fontWeight: 'bold',
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
    <Layout>
      <Box className={classes.rightHeaderContent}>
        <Grid container item className={classes.rightHeader}>
          <Typography className={classes.mr}>Dont have an account?</Typography>
          <Button onClick={() => history.push("/register")} className={classes.button1}>Create account</Button>
        </Grid>
      </Box>
      <Box style={{ flex: 1, }}>
        <Typography className={classes.title}>Welcome back!</Typography>
        <form onSubmit={handleLogin}>
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
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  // endAdornment={<InputAdornment position="end">Forgot</InputAdornment>}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end' className={classes.labelFocusStyle}>
                        <span>Forgot Password?</span>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <div style={{ width: '90%', textAlign: 'center' }}>
              <Button type="submit" variant="contained" size="large" className={classes.button2}>
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
