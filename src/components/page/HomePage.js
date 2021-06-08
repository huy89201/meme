import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewPostsAsync,
  getPostsByUserIdAsync,
  resetCurrentPage,
} from "../../store/postsActions";
import { makeStyles, Grid } from "@material-ui/core";
import PostItem from "../PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  displayNone: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  postError: {
    color: "#ec5990",
  },
  loginNotification: {
    color: "#ec5990",
    fontSize: "1.25rem",
  },
}));

function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const postPaging = useSelector((state) => state.posts.postPaging);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  const { currPage, pagesize, postList } = postPaging;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(getNewPostsAsync());

    return () => {
      dispatch(resetCurrentPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUser.token) return;

    dispatch(getPostsByUserIdAsync(Number(currentUser.id), currentUser.token));
  }, [currentUser.token]);

  const fetchMoreData = async () => {
    if (isFetching) return;

    setIsFetching(true);

    await dispatch(getNewPostsAsync(pagesize, currPage)).then((res) => {
      res.ok && setIsFetching(false);
    });
  };

  return (
    <div className="home--page--wrapper">
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <InfiniteScroll
            dataLength={postList.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Loading />}
          >
            {postList.map((item) => (
              <PostItem key={item.PID} item={item} />
            ))}
          </InfiniteScroll>
        </Grid>

        <Grid item sm={5} xs={12} className={classes.displayNone}>
          {currentUser.token ? (
            currentUserPosts.length ? (
              <PostItem
                key={currentUserPosts[0].PID}
                item={currentUserPosts[0]}
              />
            ) : (
              <p className={classes.postError}>Bạn chưa có bài viết nào</p>
            )
          ) : (
            <p className={classes.loginNotification}>
              Đăng nhập để xem bài viết mới nhất của bạn
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
