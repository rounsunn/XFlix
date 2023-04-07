import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Chip } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from "@material-ui/core";
import "./GenrePanel.css"

const genres = ["All", "Sports", "Education", "Comedy", "Lifestyle"];
const contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
const sortOptions = ["Release Date", "View Count"];
const sortValues = { "Release Date": "releaseDate", "View Count": "viewCount"};

const GenrePanel = ({ fetchVideos }) => {
  const [genresSelected, setGenresSelected] = useState(["All"]);
  const [contentRating, setContentRating] = useState("Anyone");
  const [sortBy, setSortBy] = useState("Release Date");

  const handleGenreChange = async (selectedGenre) => {
    const index = genresSelected.indexOf(selectedGenre);
    let newGenresSelected = [];

    if (index === -1) {
      newGenresSelected = [...genresSelected, selectedGenre];
    } else {
      newGenresSelected = [...genresSelected];
      if( newGenresSelected.length > 1 ) newGenresSelected.splice(index, 1);
    }

    setGenresSelected(newGenresSelected);
    fetchVideos(newGenresSelected, contentRating, sortValues[sortBy]);
  };

  const handleContentRatingChange = async (e) => {
    const selectedContentRating = e.target.value;
    setContentRating(selectedContentRating);
    fetchVideos(genresSelected, selectedContentRating, sortValues[sortBy]);
  };

  const handleSortByChange = async (selectedSortBy) => {
    setSortBy(selectedSortBy);
    fetchVideos(genresSelected, contentRating, sortValues[sortBy]);
  };

  const SortPills = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSortOptionClick = (sortOption) => {
      handleSortByChange(sortOption);
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
        <SortPills />
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
