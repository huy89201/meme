import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Avatar, Button } from "@material-ui/core";
import { getUserByIdAsync } from "../../store/userActions";
import { getPostsByUserIdAsync } from "../../store/postsActions";
import PostItem from "../PostItem";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "8rem",
    height: "8rem",
  },
  header: {
    display: "flex",
    padding: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottom: "2px solid #bf1650",
  },
  infoWrapper: {
    padding: "1rem",
  },
  subInfo: {
    display: "flex",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("541")]: {
      textAlign: "center",
    },
  },
  description: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  subInfoItem: {
    marginRight: "0.5rem",
    [theme.breakpoints.down("509")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("347")]: {
      display: "none",
    },
  },
  button: {
    marginTop: "0.5rem",
  },
  postList: {
    marginTop: "1rem",
    // marginBottom: "6rem",
  },
}));

function UserPage() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userId = params.UID;
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserByIdAsync(userId));
    dispatch(getPostsByUserIdAsync(Number(userId))).then(
      (res) => res.ok && setIsLoading(false)
    );
  }, [userId]);

  const showInfo = (key) => {
    return userId === currentUser.id ? currentUser.userData[key] : user[key];
  };

  return (
    <div>
      {isLoading || (
        <div>
          <div className={classes.header}>
            <Avatar
              src={showInfo("profilepicture")}
              className={classes.avatar}
            />
            <div className={classes.infoWrapper}>
              <div className={classes.name}>{showInfo("fullname")}</div>
              <div className={classes.description}>
                {showInfo("description")}
              </div>
              <div className={classes.subInfo}>
                <div className={classes.subInfoItem}>
                  Bài viết {currentUserPosts.length}
                </div>
                <div className={classes.subInfoItem}>
                  Người theo dõi {showInfo("yourviewed")}
                </div>
                <div className={classes.subInfoItem}>
                  Đang theo dõi {showInfo("youviewed")}
                </div>
              </div>
              {userId === currentUser.id && (
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  <Link to={`/user-info-id=${userId}`}>xem thông tin</Link>
                </Button>
              )}
            </div>
          </div>
          <div className={classes.postList}></div>
          {currentUserPosts.map((item) => (
            <PostItem key={item.PID} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPage;
