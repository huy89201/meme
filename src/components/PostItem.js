import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { getUserByIdAsync } from "../store/userActions";
import { getCommentsByPostIdAsync } from "../store/commentsActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import PostComments from "./PostComments";
import {
  makeStyles,
  Grow,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Card: {
    marginBottom: "1rem",
  },
  CardMedia: {
    paddingTop: "30rem",
  },
  ChatBubbleIcon: {
    color: "#bdbdbd",
  },
  itemStatus: {
    color: "#bdbdbd",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function PostItem({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const postComments = useSelector((state) => state.comments.comments);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getUserByIdAsync(item.USERID));
    dispatch(getCommentsByPostIdAsync(item.PID));
    // eslint-disable-next-line
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grow in={true}>
      <Card className={classes.Card}>
        <CardHeader
          avatar={
            <Link to={`/userpageId=${item.USERID}`}>
              <Avatar aria-label="recipe" src={user.profilepicture} />
            </Link>
          }
          title={<Link to={`/userpageId=${item.USERID}`}>{item.fullname}</Link>}
          subheader={item.time_added}
        />
        <CardContent>
          <Typography component="p">{item.post_content}</Typography>
        </CardContent>
        <CardMedia image={item.url_image} className={classes.CardMedia} />
        <CardActions disableSpacing>
          <ChatBubbleIcon className={classes.ChatBubbleIcon} />
          <Typography className={classes.itemStatus}>{item.status}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            // if (!item) return;
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {postComments.length ? (
            postComments.map((comment) => (
              <PostComments key={comment.CID} comment={comment} />
            ))
          ) : (
            <CardContent>
              <Typography>No comments</Typography>
            </CardContent>
          )}
        </Collapse>
      </Card>
    </Grow>
  );
}

export default PostItem;
