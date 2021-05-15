import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewPostsAsync,
  getPostsByUserIdAsync,
} from "../../store/postsActions";
import { Container, makeStyles, Grid, Typography } from "@material-ui/core";
import PostItem from "../PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    marginBottom: "4rem",
    display: "flex",
    flexWrap: "wrap",
  },
  displayNone: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const postList = useSelector((state) => state.posts.postPaging.postList);
  const postPaging = useSelector((state) => state.posts.postPaging);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  const { curPage, pagesize } = postPaging;
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (postList.length) return;
    dispatch(getNewPostsAsync());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // bug: argument is 0
    dispatch(getPostsByUserIdAsync(Number(currentUser.id)));
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    if (isFetching) return;

    setIsFetching(true);

    await dispatch(getNewPostsAsync(pagesize, curPage)).then((res) => {
      res.ok && setIsFetching(false);
    });
  };

  return (
    <div className="home--page--wrapper">
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item sm={7} xs={12}>
            <InfiniteScroll
              dataLength={postList.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              {postList.map((item) => (
                <PostItem key={item.PID} item={item} />
              ))}
            </InfiniteScroll>
          </Grid>

          <Grid item sm={5} xs={12} className={classes.displayNone}>
            {currentUserPosts && currentUserPosts.length ? (
              currentUserPosts.map((item) => (
                <PostItem key={item.PID} item={item} />
              ))
            ) : (
              <Typography>ban chua co bai viet nao</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
