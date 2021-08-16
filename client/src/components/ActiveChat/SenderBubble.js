import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, ImageList, ImageListItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    overflow: "hidden",
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  imageList: {
    borderRadius: "10px 10px 0 10px",
    maxWidth: 300,
    marginRight: '.2rem',
  },
  imageListIitem: {
    width: '100% !important',
  },
  image: {
    borderRadius: "10px",
    width: '100%',
    height: '100%',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments = [] } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble} col={attachments.length}>
        {attachments.length > 0 && (
          <ImageList rowHeight={120} className={classes.imageList} col={attachments.length} gap={8}>
            {attachments.map((img, index) => (
              <ImageListItem key={index} className={attachments.length < 2 ? classes.imageListIitem : null}>
                <img src={img} alt='attachments' className={classes.image} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {text && (
          <Typography className={classes.text}>{text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SenderBubble;
