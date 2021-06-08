import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Input, IconButton } from "@material-ui/core";
import {
  postNewComment,
  getCommentsByPostIdAsync,
} from "../store/commentsActions";

const useStyles = makeStyles((theme) => ({
  form: {
    border: "2px solid #fff",
    display: "flex",
    borderRadius: "1rem",
    backgroundColor: "#191d3a",
    marginBottom: "2rem",
    "&:focus-within": {
      borderColor: "#ff7aa8",
    },
  },
  input: {
    padding: "0.5rem 1rem",
    width: "100%",
    color: "#fff",
    fontSize: "1.5rem",
    "&::placeholder": {
      color: "#fff",
    },
   
  },
  sunbmitIcon: {
    fontSize: "3rem",
    color: "#fff",
    "&hover" : {
      color: "#ff7aa8"
    }
  },
}));

function CommentInput({ PID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.user.currentUser.token);
  function handleInput(evt) {
    setInputValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!inputValue) return;
    if (isLoading) return;

    setIsLoading(true);

    dispatch(postNewComment(inputValue, PID,token)).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        setInputValue("");
        dispatch(getCommentsByPostIdAsync(Number(PID)));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input
        type="text"
        placeholder="viết bình luận... "
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
