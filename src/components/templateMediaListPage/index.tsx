import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MediaList from "../mediaList";
import { MediaListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
    borderRadius: "4px",
    padding: "0",
  },
};

const MediaListPageTemplate: React.FC<MediaListPageTemplateProps> = ({
  media,
  title,
  action,
}) => {
  return (
    <Grid container direction='column' sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        <MediaList action={action} media={media} />
      </Grid>
    </Grid>
  );
};

export default MediaListPageTemplate;
