import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Chip } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from "@material-ui/core";
import "./GenrePanel.css"

const genres = ["All Genre", "Sports", "Education", "Comedy", "Lifestyle"];
const contentRatings = ["Any age group", "7+", "12+", "16+", "18+"];
const sortOptions = ["Release Date", "View Count"];

const SortPills = ({ sortOptions, sortBy, handleSortByChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSortOptionClick = (sortOption) => {
    handleSortByChange({ target: { value: sortOption } });
    handleClose();
  };

  return (
    <div className="sort-by-filter m-2">
      <div className="filter-options">
        <Chip
          className="pills"
          icon={<FontAwesomeIcon icon={faSort} />}
          label={sortBy}
          color={anchorEl === sortBy ? "primary" : "default"}
          onClick={handleClick}
          style={{ marginRight: "10px" }}
        />
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {sortOptions.map((sortOption, index) => (
            <MenuItem key={index} onClick={() => handleSortOptionClick(sortOption)}>
              {sortOption}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
};

const GenrePanel = ({ fetchMovies }) => {
  const [genresSelected, setGenresSelected] = useState(["All Genre"]);
  const [contentRating, setContentRating] = useState("Any age group");
  const [sortBy, setSortBy] = useState("Release Date");

  const handleGenreChange = async (selectedGenre) => {
    const index = genresSelected.indexOf(selectedGenre);
    let newGenresSelected = [];

    if (index === -1) {
      newGenresSelected = [...genresSelected, selectedGenre];
    } else {
      newGenresSelected = [...genresSelected];
      newGenresSelected.splice(index, 1);
    }

    setGenresSelected(newGenresSelected);
    fetchMovies(newGenresSelected, contentRating, sortBy);
  };

  const handleContentRatingChange = async (e) => {
    const selectedContentRating = e.target.value;
    setContentRating(selectedContentRating);
    fetchMovies(genresSelected, selectedContentRating, sortBy);
  };

  const handleSortByChange = async (selectedSortBy) => {
    setSortBy(selectedSortBy);
    fetchMovies(genresSelected, contentRating, selectedSortBy);
  };

  return (
    <Box className="genre-panel py-4 px-5">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className="genre-filter m-2">
          <div className="filter-options">
            {genres.map((g, ind) => (
              <Chip className="pills"
                key={ind}
                label={g}
                onClick={() => handleGenreChange(g)}
                color={genresSelected.includes(g) ? "primary" : "default"}
                style={{ marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
        <SortPills sortOptions={sortOptions} sortBy={sortBy} handleSortByChange={handleSortByChange} />
      </Box>
      <Box>
        <div className="content-filter m-2">
          <div className="filter-options">
            {contentRatings.map((c, ind) => (
              <Chip className="pills"
                key={ind}
                label={c}
                onClick={() => handleContentRatingChange({ target: { value: c } })}
                color={c === contentRating ? "primary" : "default"}
                style={{ marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default GenrePanel;
