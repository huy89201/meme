import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {getUserByIdAsync} from '../store/userActions'
import { getPostByPostIdAsync } from "../store/postsActions";
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Card: {
    marginBottom: "1rem",
    backgroundColor: "#081229",
    border: "2px solid #516391",
    "&:hover": {
      borderColor: "#bf1650",
    },
  },
  CardMedia: {
    paddingTop: "30rem",
    borderTop: "2px solid #516391",
    borderBottom: "2px solid #516391",
    "&:hover": {
      borderColor: "#bf1650",
    },
  },
  ChatBubbleIcon: {
    color: "#ec5990",
    marginRight: "0.5rem",
  },
  itemStatus: {
    color: "#bdbdbd",
    fontWeight: "bold",
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
  title: {
    fontSize: "1.25rem",
  },
  content: {
    fontWeight: "bold",
    color: "#ccc",
  },
}));

function PostItem({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const userId = useSelector((state) => state.posts.postDetail.post.USERID);
  const cmt = useSelector((state) => state.comments.comments);
  const userDetails = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.currentUser.token)

  useEffect(() => {
    if(item.profilepicture && item.fullname) return;
    dispatch(getUserByIdAsync(Number(userId)));
  },[])


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grow in={true}>
      <Card className={classes.Card}>
        <CardHeader
          avatar={
            <Link to={ token ? `/userpageId=${item.USERID || userId}` : '/login'}>
              <Avatar aria-label="recipe" src={item.profilepicture || userDetails.profilepicture} />
            </Link>
          }
          title={
            <Link
              to={ token ? `/userpageId=${item.USERID || userId}` : '/login'}
              className={classes.title}
            >
              {item.fullname || userDetails.fullname}
            </Link>
          }
          // subheader={item.time_added}
        />
        <CardContent>
          <Typography component="p" className={classes.content}>
            {item.post_content}
          </Typography>
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
          <Typography className={classes.itemStatus}>{item.count || cmt.length}</Typography>
        </CardActions>
      </Card>
    </Grow>
  );
}

export default PostItem;
