import React, { createRef, Component } from "react";
import { FormControl, LinearProgress, Box, FilledInput, Input as Inp } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, myInterceptor } from "../../store/utils/thunkCreators";
import emoji from '../../images/emoji.svg';
import file from '../../images/file.svg';
import axios from "axios";

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
      uploadedCount: 0,
      totalFilesCount: 0,
      progress: null
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
      this.setState({ totalFilesCount: files.length })
      const imagesUrl = await this.uploadImage(files);
      this.setState({ uploadedCount: 0, progress: null });

      reqBody.attachments = imagesUrl;
    }
    await this.props.postMessage(reqBody);
    this.setState({
      text: "",
    });
  };

  openFileDialog = () => {
    this.inputFileRef.current.click();
  }

  uploadImage = async (files) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();

    let imagesUrl = [];

    for (let index = 0; index < files.length; index++) {
      this.setState({ uploadedCount: index + 1 });
      const file = files[index];
      formData.append("file", file);
      formData.append("upload_preset", `${uploadPreset}`);

      try {
        const el = this;
        await axios.interceptors.request.eject(myInterceptor);
        const { data } = await axios.post(url, formData, {
          onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent;
            const progress = Math.floor((loaded / total) * 100);

            el.setState({ progress });
          },
        });
        imagesUrl.push(data.url);
      } catch (error) {
        console.error(error);
      }
    }
    return imagesUrl;
  };

  render() {
    const { classes } = this.props;
    const { text, uploadedCount, totalFilesCount, progress } = this.state;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          {progress && (
            <Box px="0.4rem" pb="1rem">
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            disabled={uploadedCount !== 0}
            placeholder={uploadedCount ? `Uploading images: ${uploadedCount} of ${totalFilesCount}` : "Type something..."}
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
