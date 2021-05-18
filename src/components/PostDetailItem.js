import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostComments from "./PostComments";
import CommentInput from "./CommentInput";
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Card: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  CardMedia: {
    paddingTop: "30rem",
  },
}));

function PostDetailItem({ user, post, categories }) {
  const classes = useStyles();

  const cmt = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <Card className={classes.Card}>
        <CardHeader
          avatar={
            <Link to={`/userpageId=${post.USERID}`}>
              {user && <Avatar aria-label="recipe" src={user.profilepicture} />}
            </Link>
          }
          title={
            user && (
              <Link to={`/userpageId=${post.USERID}`}>{user.fullname}</Link>
            )
          }
          subheader={post.time_added}
        />
        <CardContent>
          <Typography component="p">{post.post_content}</Typography>
        </CardContent>
        <CardMedia
          image={
            post.url_image ||
            "https://i.pinimg.com/564x/5e/47/a3/5e47a3c6c1f85255c9e32f294a3dd173.jpg"
          }
          className={classes.CardMedia}
        />
      </Card>
      <Card className={classes.Card}>
        <h1>Categories</h1>
        {categories.map((item) => (
          <p key={item.TAG_ID}>{item.tag_value}</p>
        ))}
      </Card>

      <p>{cmt.length} comments</p>

      {currentUser.token ? (
        <CommentInput PID={post.PID} />
      ) : (
        <Typography>Login to comment</Typography>
      )}

      <Card className={classes.Card}>
        <PostComments PID={post.PID} isShowComentInput={false} />
      </Card>
    </div>
  );
}

export default PostDetailItem;
