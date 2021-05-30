import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewPostsAsync,
  getPostsByUserIdAsync,
  resetCurrentPage,
} from "../../store/postsActions";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import PostItem from "../PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  displayNone: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const postPaging = useSelector((state) => state.posts.postPaging);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.currentUser.token);
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
    dispatch(getPostsByUserIdAsync(Number(currentUser.id)));
  }, [currentUser.id]);

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
            loader={<h4>Loading...</h4>}
          >
            {postList.map((item) => (
              <PostItem key={item.PID} item={item} />
            ))}
          </InfiniteScroll>
        </Grid>

        <Grid item sm={5} xs={12} className={classes.displayNone}>
          {currentUserPosts && currentUserPosts.length ? (
            // (
            //   currentUserPosts.map((item) => (
            //     <PostItem key={item.PID} item={item} isShowComents={true}/>
            //   ))
            // )
            <PostItem
              key={currentUserPosts[0].PID}
              item={currentUserPosts[0]}
              isShowComents={false}
            />
          ) : (
            <Typography>ban chua co bai viet nao</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
