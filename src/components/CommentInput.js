import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Input, IconButton } from "@material-ui/core";
import {
  postNewComment,
  getCommentsByPostIdAsync,
} from "../store/commentsActions";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    borderRadius: "1rem",
    backgroundColor: "whitesmoke",
  },
  input: {
    padding: "0.5rem 1rem",
    width: "100%",
  },
  sunbmitIcon: {
    fontSize: "3rem",
  },
}));

function CommentInput({ PID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleInput(evt) {
    setInputValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!inputValue) return;
    if (isLoading) return;

    setIsLoading(true);

    dispatch(postNewComment(inputValue, PID)).then((res) => {
      setIsLoading(false);
      if(res.ok){
        setInputValue('');
        dispatch(getCommentsByPostIdAsync(PID));
      }
    });

  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input
        type="text"
        placeholder="write your commnent"
        disableUnderline={true}
        onChange={handleInput}
        className={classes.input}
        value={inputValue}
      />

      <IconButton onClick={handleSubmit}>
        <AddIcon className={classes.sunbmitIcon} />
      </IconButton>
    </form>
  );
}

export default CommentInput;
