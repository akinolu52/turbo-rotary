import React, { createRef, Component } from "react";
import { FormControl, Box, FilledInput, Input as Inp } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import emoji from '../../images/emoji.svg';
import file from '../../images/file.svg';


const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    fontWeight: "bold",
    paddingLeft: '1rem',
    fontSize: '1rem'
  },
  icon: {
    marginLeft: '.7rem',
    cursor: 'pointer',
  },
  actionButtons: {
    paddingRight: '1rem',
    display: "flex"
  }
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.inputFileRef = createRef();
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
    };
    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
    });
  };

  openFileDialog = () => {
    this.inputFileRef.current.click();
  }

  onFileChange = (e) => {
    console.log(e.target.files);
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            endAdornment={(
              <Box className={classes.actionButtons}>
                <img src={file} alt="file" className={classes.icon} onClick={this.openFileDialog} />
                <img src={emoji} alt="emoji" className={classes.icon} />
              </Box>
            )}
          />
        </FormControl>

        <Box display="none">
          <Inp
            type="file"
            inputRef={this.inputFileRef}
            onChange={this.onFileChange}
            inputProps={{ multiple: true }}
          />
        </Box>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
