import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Review } from "../../types/interfaces";

const styles = {
  root: {
    padding: "15px",
    margin: "10px 0",
  },
  author: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  content: {
    marginTop: "10px",
  },
};

const MediaReview: React.FC<Review> = (props) => {
  return (
    <Paper sx={styles.root}>
      <Typography variant='h6' sx={styles.author}>
        Review By: {props.author}
      </Typography>
      <Typography variant='body1' sx={styles.content}>
        {props.content}
      </Typography>
    </Paper>
  );
};

export default MediaReview;
