import React, { createRef, Component } from "react";
import { FormControl, LinearProgress, Box, FilledInput, Input as Inp } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, uploadImage } from "../../store/utils/thunkCreators";
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
    let reqBody = {
      text: this.state.text,
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
    };
    let files = event.target.files;

    if (files) {
      await this.props.uploadImage(files);
      reqBody.attachments = this.props.imagesUrl;
    }
    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
    });
  };

  openFileDialog = () => {
    this.inputFileRef.current.click();
  }

  render() {
    const { classes, uploadedCount, totalImageCount, complete } = this.props;
    const { text } = this.state;
    const progress = (uploadedCount / totalImageCount) * 100;

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          {uploadedCount && !complete && (
            <Box px="0.4rem" pb="1rem">
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            disabled={uploadedCount && !complete}
            placeholder={uploadedCount && !complete ? `Uploading images: ${uploadedCount} of ${totalImageCount}` : "Type something..."}
            value={text}
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
            onChange={this.handleSubmit}
            inputProps={{ multiple: true }}
          />
        </Box>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { imagesUrl, uploadedCount, totalImageCount, complete } = state.image;

  return {
    user: state.user,
    conversations: state.conversations,
    complete,
    imagesUrl,
    uploadedCount,
    totalImageCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    uploadImage: (images) => {
      return Promise.resolve(dispatch(uploadImage(images)));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
