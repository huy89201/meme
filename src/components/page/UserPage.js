import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Avatar } from "@material-ui/core";
import { getUserByIdAsync } from "../../store/userActions";
import { getPostsByUserIdAsync } from "../../store/postsActions";
import PostItem from "../PostItem";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "8rem",
    height: "8rem",
    border: "4px solid #4f6294",
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
    color: "#fff",
    [theme.breakpoints.down("541")]: {
      textAlign: "center",
    },
  },
  description: {
    marginTop: "2rem",
    marginBottom: "2rem",
    color: "#fff",
  },
  subInfoItem: {
    marginRight: "0.5rem",
    color: "#fff",
    [theme.breakpoints.down("509")]: {
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down("347")]: {
      display: "none",
    },
  },
  userinfo: {
    marginTop: "2rem",
    fontSize: "1.25rem",
    color: "#ec5990",
    "&:hover": {
      color: "#bf1650",
    },
  },
  postList: {
    marginTop: "1rem",
  },
}));

function UserPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userId = params.UID;
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser.token) return;

    setIsLoading(true);
    dispatch(getUserByIdAsync(userId));
    dispatch(getPostsByUserIdAsync(Number(userId), currentUser.token)).then(
      (res) => res.ok && setIsLoading(false)
    );
  }, [userId, currentUser.token]);

  const showInfo = (key) => {
    return userId === currentUser.id ? currentUser.userData[key] : user[key];
  };

  return (
    <div>
      {!isLoading ? (
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
                {currentUserPosts.length && (
                  <div className={classes.subInfoItem}>
                    B??i vi???t {currentUserPosts.length}
                  </div>
                )}
                <div className={classes.subInfoItem}>
                  Ng?????i theo d??i {showInfo("yourviewed")}
                </div>
                <div className={classes.subInfoItem}>
                  ??ang theo d??i {showInfo("youviewed")}
                </div>
              </div>
              {userId === currentUser.id && (
                <Link
                  to={`/user-info-id=${userId}`}
                  className={classes.userinfo}
                >
                  xem th??ng tin...
                </Link>
              )}
            </div>
          </div>
          <div className={classes.postList}></div>
          {currentUserPosts.map((item) => (
            <PostItem key={item.PID} item={item} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserPage;
