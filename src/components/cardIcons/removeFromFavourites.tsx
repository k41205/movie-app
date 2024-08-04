import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MediaContext } from "../../contexts/mediaContext";
import { RemoveFromFavouritesProps } from "../../types/interfaces";

const RemoveFromFavourites: React.FC<RemoveFromFavouritesProps> = ({
  item,
}) => {
  const { removeFromFavourites } = useContext(MediaContext);

  const handleRemoveFromFavourites = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFromFavourites(item);
  };

  return (
    <IconButton
      aria-label='remove from favorites'
      onClick={handleRemoveFromFavourites}
    >
      <DeleteIcon color='primary' fontSize='large' />
    </IconButton>
  );
};

export default RemoveFromFavourites;
