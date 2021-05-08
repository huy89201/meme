import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { getUserByIdAsync } from "../store/userActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import PostComments from "./PostComments";
import CommentInput from "./CommentInput";
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
  const user = useSelector((state) => !!state.user.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getUserByIdAsync(item.USERID));
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
        <CardMedia
          image={
            item.url_image ||
            "https://i.pinimg.com/564x/5e/47/a3/5e47a3c6c1f85255c9e32f294a3dd173.jpg"
          }
          className={classes.CardMedia}
          component={Link}
          to={`postPostId=${item.PID}`}
        />
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
        <CardContent>
          {currentUser ? (
            <CommentInput />
          ) : (
            <Typography>Login to comment</Typography>
          )}
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <PostComments PID={item.PID} />
        </Collapse>
      </Card>
    </Grow>
  );
}

export default PostItem;
