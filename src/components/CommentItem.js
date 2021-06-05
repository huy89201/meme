import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
  Grow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
  },
  girdItem: {
    backgroundColor: "whitesmoke",
    borderRadius: "1rem",
  },
  content: {
    backgroundColor: "#191d3a",
    borderRadius: "1rem",
    width: "100%",
    marginLeft: "0.5rem"
  },
  name: {
    fontSize:'1.25rem',
    marginBottom: '0.5rem',
    color: "#ccc"
  },
  commentContent: {
    color: "#fff",

  },
}));

function CommentItem({ comment }) {
  const classes = useStyles();

  return (
    <Grow in={true}>
      <CardContent className={classes.comment}>
        <Link to={`/userpageId=${comment.USERID}`}>
          <Avatar aria-label="recipe" src={comment.profilepicture} />
        </Link>
        <CardContent className={classes.content}>
          <Link to={`/userpageId=${comment.USERID}` } className={classes.name}>{comment.fullname}</Link>
          <Typography className={classes.commentContent}>{comment.comment}</Typography>
        </CardContent>
        {/* <Grid container>
          <Grid item xs={4}>
            <CardHeader
              avatar={
                <Link to={`/userpageId=${comment.USERID}`}>
                  <Avatar aria-label="recipe" src={comment.profilepicture} />
                </Link>
              }
              title={
                <Link to={`/userpageId=${comment.USERID}`}>
                  {comment.fullname}
                </Link>
              }
              // subheader={comment.time_added}
            />
          </Grid>
          <Grid item xs={8} className={classes.girdItem}>
            <CardContent>
              <Typography>{comment.comment}</Typography>
            </CardContent>
          </Grid>
        </Grid> */}
      </CardContent>
    </Grow>
  );
}

export default CommentItem;
