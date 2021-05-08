import React from "react";
import AddIcon from "@material-ui/icons/Add";

import { makeStyles, Input, IconButton} from "@material-ui/core";

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

function CommentInput() {
  const classes = useStyles();

  function handleSubmit(evt) {
    evt.preventDefault();

    // console.log("run");
  }

  function handleInput(evt) {
    // console.log(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Input
        type="text"
        placeholder="write your commnent"
        disableUnderline={true}
        onChange={handleInput}
        className={classes.input}
      />

      <IconButton onClick={handleSubmit}>
        <AddIcon className={classes.sunbmitIcon} />
      </IconButton>
    </form>
  );
}

export default CommentInput;

