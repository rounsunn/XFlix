import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import xflixLogo from "../assets/xflix_logo.svg";
import VideoUploadModal from "./UploadModal";
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


function Header({ hasSearchAndUploadButton = false, onSearch }) {
  const [openModal, setOpenModal] = useState(false);

  const handleUploadClose = () => {
    setOpenModal(false);
  };

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
            endAdornment: (
              <InputAdornment position="end">
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

    const handleUploadClick = () => {
      setOpenModal(true);
    };
  
    return (
      <Button
        variant="contained"
        className={classes.uploadButton}
        startIcon={<PublishIcon className={classes.uploadIcon} />}
        onClick={handleUploadClick}
      >
        Upload
      </Button>
    );
  };

  return (
    <Box className="header p-2" display="flex" justifyContent="space-between" alignItems="center">
      <Box className="header-title">
        <Link to={`/`}> <img src={xflixLogo} alt="XFlix-logo" /> </Link>
      </Box>
      {hasSearchAndUploadButton ? 
        <Box display="flex" justifyContent="space-between" flexGrow=".5" alignItems="center">
          <SearchBar onSearch={onSearch}/>
          {openModal ? <VideoUploadModal open={openModal} onClose={handleUploadClose} /> : <UploadButton />}
        </Box>
      : <></>}
    </Box>
  );
};

export default Header;
