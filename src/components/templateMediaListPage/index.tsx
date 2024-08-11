import React from "react";
import Header from "../headerMediaList";
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

interface MediaListPageTemplatePropsExtended
  extends MediaListPageTemplateProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isFavoritesPage?: boolean;
}

const MediaListPageTemplate: React.FC<MediaListPageTemplatePropsExtended> = ({
  media,
  title,
  action,
  page,
  totalPages,
  onPageChange,
  isFavoritesPage = false,
}) => {
  return (
    <Grid container direction='column' sx={styles.root}>
      <Grid item xs={12}>
        <Header
          title={title}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          disableArrows={isFavoritesPage}
        />
      </Grid>
      <Grid item xs={12}>
        <MediaList action={action} media={media} />
      </Grid>
    </Grid>
  );
};

export default MediaListPageTemplate;
