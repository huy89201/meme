import React, { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getNewPostsAsync } from "../../store/postsActions";
import { Container, makeStyles, Grid } from "@material-ui/core";
import PostItem from '../PostItem'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    display: "flex",
    flexWrap: "wrap",
  },
}));

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const postList = useSelector(state => state.posts.postList)

  useEffect(() => {
    dispatch(getNewPostsAsync());
    // react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home--page--wrapper">
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={8} xs={12}>
            {postList.map(item => <PostItem key={item.PID} item={item}/>)}
          </Grid>
          <Grid item sm={4} xs={12}>
            hello
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
