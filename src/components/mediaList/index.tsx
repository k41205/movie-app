import React from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "../mediaCard";
import { MediaListProps } from "../../types/interfaces";

const MediaList: React.FC<MediaListProps> = ({ media, action }) => {
  return (
    <Grid container spacing={5}>
      {media.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MediaCard item={item} action={() => action(item)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaList;
