import React, { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { MediaContext } from "../../contexts/mediaContext";
import { Media } from "../../types/interfaces";

interface AddToFavouritesIconProps {
  item: Media;
}

const AddToFavouritesIcon: React.FC<AddToFavouritesIconProps> = ({ item }) => {
  const { addToFavourites } = useContext(MediaContext);

  const handleAddToFavourites = () => {
    addToFavourites(item);
  };

  return (
    <IconButton aria-label='add to favorites' onClick={handleAddToFavourites}>
      <FavoriteIcon color='primary' fontSize='large' />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
