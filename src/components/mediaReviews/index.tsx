import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews, getTVSeriesReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { Review, MediaDetailsProps } from "../../types/interfaces";

const styles = {
  table: {
    minWidth: 550,
  },
};

const MediaReviews: React.FC<{ media: MediaDetailsProps }> = ({ media }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if ("runtime" in media) {
        const movieReviews = await getMovieReviews(media.id);
        const mappedMovieReviews = movieReviews.map((review) => ({
          author: review.author,
          content: review.content,
          id: review.id,
          mediaId: media.id,
          mediaType: "movie",
          agree: review.agree || false,
          rating: review.rating || 0,
        }));
        setReviews(mappedMovieReviews);
      } else {
        const tvSeriesReviews = await getTVSeriesReviews(media.id);
        const mappedTvSeriesReviews = tvSeriesReviews.map((review) => ({
          author: review.author,
          content: review.content,
          id: review.id,
          mediaId: media.id,
          mediaType: "tv",
          agree: review.agree || false,
          rating: review.rating || 0,
        }));
        setReviews(mappedTvSeriesReviews);
      }
    };

    fetchReviews();
  }, [media, media.id]);

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label='reviews table'>
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align='center'>Excerpt</TableCell>
            <TableCell align='right'>More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r: Review) => (
            <TableRow key={r.id}>
              <TableCell component='th' scope='row'>
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    media,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MediaReviews;
