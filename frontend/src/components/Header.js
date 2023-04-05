import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import xflixLogo from "../assets/xflix_logo.svg";
import "./Header.css";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    root: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[500],
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[700],
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
    input: {
      color: theme.palette.text.primary,
    },
  },
  uploadButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  uploadIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SearchBar = ({ onSearch }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(searchValue);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue, onSearch]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        placeholder="Search"
        className={classes.searchInput}
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

const UploadButton = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.uploadButton}
      startIcon={<PublishIcon className={classes.uploadIcon} />}
    >
      Upload
    </Button>
  );
};

function Header({ hasSearchAndUploadButton = false, onSearch }) {
  return (
    <Box className="header p-2" display="flex" justifyContent="space-between" alignItems="center">
      <Box className="header-title">
        <img src={xflixLogo} alt="XFlix-logo" />
      </Box>
      {hasSearchAndUploadButton ? 
        <Box display="flex" justifyContent="space-between" flexGrow=".5" alignItems="center">
          <SearchBar onSearch={onSearch}/>
          <UploadButton />
        </Box>
      : <></>}
    </Box>
  );
};

export default Header;
