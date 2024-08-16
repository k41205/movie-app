import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { Review, Movie, TVSerie } from "../../types/interfaces";
import ratings from "./ratingCategories";

interface ReviewFormProps {
  media: Movie | TVSerie;
  mediaType: "movie" | "tv";
}

const ReviewForm: React.FC<ReviewFormProps> = ({ media, mediaType }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Review>({
    defaultValues: {
      author: "",
      content: "",
      rating: 3,
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<Review> = (review) => {
    review.mediaId = media.id;
    review.mediaType = mediaType;
    setOpen(true);
  };

  const handleSnackClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography component='h2' variant='h3'>
        Write a Review
      </Typography>
      <Snackbar open={open} onClose={handleSnackClose}>
        <Alert severity='success' variant='filled' onClose={handleSnackClose}>
          Thank you for submitting a review
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name='author'
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author's name"
              variant='outlined'
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        {errors.author && (
          <Typography variant='h6'>{errors.author.message}</Typography>
        )}
        <Controller
          name='content'
          control={control}
          rules={{
            required: "Review cannot be empty",
            minLength: { value: 10, message: "Review is too short" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Review text'
              variant='outlined'
              fullWidth
              required
              multiline
              minRows={10}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        {errors.content && (
          <Typography variant='h6'>{errors.content.message}</Typography>
        )}
        <Controller
          name='rating'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Rating'
              select
              variant='outlined'
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Box>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ marginRight: 2 }}
          >
            Submit
          </Button>
          <Button
            type='reset'
            variant='contained'
            color='secondary'
            onClick={() =>
              reset({
                author: "",
                content: "",
                rating: 3,
              })
            }
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
