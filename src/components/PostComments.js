import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostIdAsync } from "../store/commentsActions";
import {
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CommentInput from "./CommentInput";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    margin: "0 auto",
  },
  icon: {
    fontSize: "3rem",
  },
}));

function PostComments({ PID, isShowComentInput }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
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
    <CardContent>
      {isShowComentInput && (currentUser.token ? (
        <CommentInput PID={PID} />
      ) : (
        <Typography>Login to comment</Typography>
      ))}
      {currentComments.map((comment) => (
        <CommentItem key={comment.CID} comment={comment} />
      ))}
      {totalComments ? (
        <IconButton className={classes.button} onClick={handleLoadMore}>
          <ExpandMoreIcon className={classes.icon} />
        </IconButton>
      ) : (
        <Typography>No comments yet</Typography>
      )}
    </CardContent>
  );
}

export default PostComments;
