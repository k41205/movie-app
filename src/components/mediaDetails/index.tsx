import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  MediaDetailsProps,
  Genre,
  MovieImage,
  KnownForMedia,
} from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MediaReviews from "../mediaReviews";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import MovieIcon from "@mui/icons-material/Movie";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 80,
    right: 20,
  },
};

const MediaDetails: React.FC<MediaDetailsProps & { images: MovieImage[] }> = (
  media
) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant='h5' component='h3'>
        {media.name || media.title}
      </Typography>

      <Typography variant='h6' component='p'>
        {media.overview || media.biography}
      </Typography>

      {media.mediaType === "actor" && (
        <>
          <Paper component='ul' sx={styles.chipSet}>
            {media.birthday && (
              <Chip icon={<CakeIcon />} label={`Born: ${media.birthday}`} />
            )}
            {media.place_of_birth && (
              <Chip
                icon={<WorkIcon />}
                label={`Place of Birth: ${media.place_of_birth}`}
              />
            )}
          </Paper>

          <Paper component='ul' sx={styles.chipSet}>
            <li>
              <Chip label='Known For' sx={styles.chipLabel} color='primary' />
            </li>
            {media.known_for &&
              media.known_for.map((work: KnownForMedia) => (
                <li key={work.id}>
                  <Chip
                    icon={<MovieIcon />}
                    label={work.title || work.name}
                    sx={styles.chipLabel}
                  />
                </li>
              ))}
          </Paper>
        </>
      )}

      {"genres" in media && (
        <Paper component='ul' sx={styles.chipSet}>
          <li>
            <Chip label='Genres' sx={styles.chipLabel} color='primary' />
          </li>
          {media.genres.map((g: Genre) => (
            <li key={g.id}>
              <Chip label={g.name} />
            </li>
          ))}
        </Paper>
      )}

      <Fab
        color='secondary'
        variant='extended'
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor='top'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MediaReviews media={media} />
      </Drawer>
    </>
  );
};

export default MediaDetails;
