import React, { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { GenreData, FilterOption } from "../../types/interfaces";
import { getGenres } from "../../api/tmdb-api";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMediasCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  onSortChange: (name: string, direction: "asc" | "desc") => void;
  titleFilter: string;
  genreFilter?: string;
  sortOption: { name: string; direction: "asc" | "desc" };
  isActorPage?: boolean;
}

const FilterMediasCard: React.FC<FilterMediasCardProps> = ({
  titleFilter,
  genreFilter,
  sortOption,
  onUserInput,
  onSortChange,
  isActorPage = false,
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: 0, name: "All" });
  }

  const handleChange = (
    e: SelectChangeEvent,
    type: FilterOption,
    value: string
  ) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    const [name, direction] = e.target.value.split("-");
    onSortChange(name, direction as "asc" | "desc");
  };

  return (
    <>
      <Card sx={styles.root} variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h1'>
            <FilterAltIcon fontSize='large' />
            Filter
          </Typography>
          <TextField
            sx={styles.formControl}
            id='filled-search'
            label='Search field'
            type='search'
            value={titleFilter}
            variant='filled'
            onChange={handleTextChange}
          />
          {!isActorPage && (
            <FormControl sx={styles.formControl} variant='outlined'>
              <InputLabel id='genre-label'>Genre</InputLabel>
              <Select
                labelId='genre-label'
                id='genre-select'
                value={genreFilter}
                label='Genre'
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        </CardContent>
      </Card>
      <Card sx={styles.root} variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h1'>
            <SortIcon fontSize='large' />
            Sort
          </Typography>
          <FormControl sx={styles.formControl} variant='outlined'>
            <InputLabel id='sort-label'>Sort By</InputLabel>
            <Select
              labelId='sort-label'
              id='sort-select'
              value={`${sortOption.name}-${sortOption.direction}`}
              onChange={handleSortChange}
              label='Sort By'
            >
              <MenuItem value='title-asc'>Title (A-Z)</MenuItem>
              <MenuItem value='title-desc'>Title (Z-A)</MenuItem>
              {!isActorPage && (
                <MenuItem value='release_date-asc'>
                  Release Date (Oldest)
                </MenuItem>
              )}
              {!isActorPage && (
                <MenuItem value='release_date-desc'>
                  Release Date (Newest)
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMediasCard;
