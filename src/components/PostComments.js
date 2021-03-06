import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostIdAsync } from "../store/commentsActions";
import {
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    margin: "0 auto",
  },
  icon: {
    color: "#fff",
    fontSize: "3rem",
  },
  cardContent: {
    backgroundColor: "#081229",
  },
  error: {
    color: "#fff",
    fontWeight: "bold",
  }
}));

function PostComments({ PID}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.comments.comments);
  const [lastComment, setLastComment] = useState(3);
  const totalComments = postComments.length;
  const currentComments = postComments.slice(0, lastComment);

  useEffect(() => {
    dispatch(getCommentsByPostIdAsync(Number(PID)));
    // eslint-disable-next-line
  }, [PID]);

  const handleLoadMore = () => {
    if (lastComment > totalComments) return;
    
    setLastComment(lastComment + 3);
  };

  return (
    <div className={classes.cardContent}>
      {currentComments.map((comment) => (
        <CommentItem key={comment.CID} comment={comment} />
      ))}
      {totalComments ? (
        <IconButton className={classes.button} onClick={handleLoadMore}>
          <ExpandMoreIcon className={classes.icon}/>
        </IconButton>
      ) : (
        <Typography className={classes.error} >Chưa có bình luận nào</Typography>
      )}
    </div>
  );
}

export default PostComments;
