import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import {
  MediaCardProps,
  Media,
  Movie,
  TVSerie,
  Actor,
} from "../../types/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MediaContext } from "../../contexts/mediaContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MediaCard: React.FC<MediaCardProps> = ({ item, action }) => {
  const { favouriteMovies, favouriteTVSeries } = useContext(MediaContext);

  const isFavourite =
    item.mediaType === "movie"
      ? favouriteMovies.includes(item.id)
      : favouriteTVSeries.includes(item.id);

  const displayTitle = (item: Media) => {
    if ((item as Movie).title) return (item as Movie).title;
    if ((item as TVSerie).name) return (item as TVSerie).name;
    return (item as Actor).original_name;
  };

  const displayReleaseDate = (item: Media) => {
    if ((item as Movie).release_date) return (item as Movie).release_date;
    if ((item as TVSerie).first_air_date)
      return (item as TVSerie).first_air_date;
    return null;
  };

  const displayPosterPath = (item: Media) => {
    if ((item as Movie).poster_path) return (item as Movie).poster_path;
    if ((item as TVSerie).poster_path) return (item as TVSerie).poster_path;
    if ((item as Actor).profile_path) return (item as Actor).profile_path;
    return img;
  };

  const displayVoteAverage = (item: Media) => {
    if ((item as Movie).vote_average) return (item as Movie).vote_average;
    if ((item as TVSerie).vote_average) return (item as TVSerie).vote_average;
    return null;
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant='h5' component='p'>
            {displayTitle(item)}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={`https://image.tmdb.org/t/p/w500${displayPosterPath(item)}`}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant='h6' component='p'>
              <CalendarIcon fontSize='small' />
              {displayReleaseDate(item)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6' component='p'>
              <StarRateIcon fontSize='small' />
              {"  "} {displayVoteAverage(item)}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action}
        {item.mediaType === "movie" && (
          <Link to={`/movies/${item.id}`}>
            <Button variant='outlined' size='medium' color='primary'>
              More Info ...
            </Button>
          </Link>
        )}
        {item.mediaType === "tv" && (
          <Link to={`/tvseries/${item.id}`}>
            <Button variant='outlined' size='medium' color='primary'>
              More Info ...
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default MediaCard;
