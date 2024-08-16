import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  MediaDetailsProps,
  Movie,
  MovieDetailsProps,
} from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const isMovie = (media: MediaDetailsProps): media is MovieDetailsProps => {
  return (media as Movie).runtime !== undefined;
};

const MediaHeader: React.FC<MediaDetailsProps> = (media) => {
  return (
    <Paper component='div' sx={styles.root}>
      <Typography variant='h4' component='h3'>
        {isMovie(media) ? media.title : media.name}
      </Typography>
    </Paper>
  );
};

export default MediaHeader;
