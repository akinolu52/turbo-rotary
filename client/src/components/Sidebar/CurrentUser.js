import React, { useState } from "react";
import { Grid, Box, Typography, Button, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { logout } from "../../store/utils/thunkCreators";
import { clearOnLogout } from "../../store/index";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center"
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5
  },
  dropdownRoot: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: -10,
    right: 0,
    left: -140,
    zIndex: 1,
  },
  button1: {
    padding: '.9rem 4rem 1rem',
    color: '#FFF',
    backgroundColor: "#3A8DFF",
    boxShadow: '1px 2px 8px 2px rgba(0, 0, 0, 0.1)',
    marginTop: '2.2rem'
  },
}));

const CurrentUser = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { logoutUser, user = {} } = props;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await logoutUser(user.id);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>

        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid className={classes.dropdownRoot}>
            <MoreHorizIcon classes={{ root: classes.ellipsis }} onClick={handleClick} />
            {open && (
              <Box className={classes.dropdown}>
                <Button className={classes.button1}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Grid>
        </ClickAwayListener>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
