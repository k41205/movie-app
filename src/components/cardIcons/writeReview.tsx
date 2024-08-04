import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { WriteReviewProps } from "../../types/interfaces";

const WriteReview: React.FC<WriteReviewProps> = ({ item }) => {
  return (
    <IconButton
      aria-label='write a review'
      component={Link}
      to={`/reviews/form?mediaId=${item.id}`}
    >
      <RateReviewIcon color='primary' fontSize='large' />
    </IconButton>
  );
};

export default WriteReview;
