import React from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Icon,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Card: {
    marginBottom: "1rem",
    backgroundColor: "whitesmoke",
  },
  CardMedia: {
    paddingTop: "30rem",
  },
  ChatBubbleIcon: {
    color: "#bdbdbd",
  },
  itemStatus: {
    color: "#bdbdbd",
  }
}));

function PostItem({ item }) {
  const classes = useStyles();

  if (!item) return;

  //   console.log(item.url_image);
  //status
  return (
    <Card className={classes.Card}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">abc</Avatar>}
        title={item.fullname}
        subheader={item.time_added}
      />
      <CardContent>
        <Typography component="p">{item.post_content}</Typography>
      </CardContent>
      <CardMedia image={item.url_image} className={classes.CardMedia} />
      <CardActions disableSpacing>
        <ChatBubbleIcon className={classes.ChatBubbleIcon} />
        <Typography className={classes.itemStatus}>{item.status}</Typography>
      </CardActions>
    </Card>
  );
}

export default PostItem;
