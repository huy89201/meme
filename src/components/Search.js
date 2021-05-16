import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
    color: "black",
    border: "1px solid",
    borderRadius: "1.5rem",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    height: "2rem",
    boxShadow: "box-shadow: 2px 1px 10px 5px rgba(184, 182, 182, 0.4)",
  },
  fontSize: {
    fontSize: "30px",
  },
}));

function Search() {
  const classes = useStyles();
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (evt) => setInputValue(evt.target.value);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!inputValue) return;
    if (isLoading) return;

    setIsLoading(true);

    history.push(`/search--querySting=${inputValue}`);

    setInputValue("");
    setIsLoading(false);
  };

  return (
    <form className={classes.search} onSubmit={handleSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon className={classes.fontSize} />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={inputValue}
        onChange={handleInput}
      />
    </form>
  );
}

export default Search;
