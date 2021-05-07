import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
  },
  girdItem: {
    backgroundColor: 'whitesmoke',
    borderRadius: '1rem'
  },
}));

function PostComments({ comment }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.comment}>
      <Grid container>
        <Grid item xs={4}>
          <CardHeader
            avatar={
              <Link to={`/userpageId=${comment.USERID}`}>
              <Avatar aria-label="recipe" src={comment.profilepicture} />
            </Link>
            }
            title={<Link to={`/userpageId=${comment.USERID}`}>{comment.fullname}</Link>}
            subheader={comment.time_added}
          />
        </Grid>
        <Grid item xs={8} className={classes.girdItem}>
          <CardContent>
            <Typography>{comment.comment}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </CardContent>
  );
}

export default PostComments;
