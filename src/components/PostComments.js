import React, { useEffect } from "react";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostIdAsync } from "../store/commentsActions";
import { makeStyles, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

function PostComments({ PID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(getCommentsByPostIdAsync(PID));
    // eslint-disable-next-line
  }, []);

  return (
    <CardContent>
      {postComments.map((comment) => (
        <CommentItem key={comment.CID} comment={comment} />
      ))}
    </CardContent>
  );
}

export default PostComments;