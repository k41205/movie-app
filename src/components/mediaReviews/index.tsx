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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if ("runtime" in media) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const movieReviews = await getMovieReviews(media.id);
        // setReviews(movieReviews);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tvSeriesReviews = await getTVSeriesReviews(media.id);
        // setReviews(tvSeriesReviews);
      }
    };

    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media.id]);

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
