import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MediaDetailsProps, Genre, MovieImage } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MediaReviews from "../mediaReviews";

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
        Overview
      </Typography>

      <Typography variant='h6' component='p'>
        {media.overview}
      </Typography>

      <Paper component='ul' sx={styles.chipSet}>
        <li>
          <Chip label='Genres' sx={styles.chipLabel} color='primary' />
        </li>
        {"genres" in media &&
          media.genres.map((g: Genre) => (
            <li key={g.id}>
              <Chip label={g.name} />
            </li>
          ))}
      </Paper>
      <Paper component='ul' sx={styles.chipSet}>
        {"runtime" in media && (
          <>
            <Chip icon={<AccessTimeIcon />} label={`${media.runtime} min.`} />
            <Chip
              icon={<MonetizationIcon />}
              label={`${media.revenue?.toLocaleString()}`}
            />
            <Chip
              icon={<StarRate />}
              label={`${media.vote_average} (${media.vote_count})`}
            />
            <Chip label={`Released: ${media.release_date}`} />
          </>
        )}
        {"number_of_episodes" in media && (
          <>
            <Chip
              icon={<AccessTimeIcon />}
              label={`${media.number_of_episodes} episodes`}
            />
            <Chip
              icon={<MonetizationIcon />}
              label={`${media.number_of_seasons} seasons`}
            />
            <Chip
              icon={<StarRate />}
              label={`${media.vote_average} (${media.vote_count})`}
            />
            <Chip label={`First aired: ${media.first_air_date}`} />
          </>
        )}
      </Paper>
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
