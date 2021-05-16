import React, { useEffect, useState } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByQueryStringAsync } from "../../store/postsActions";
import { useParams } from "react-router-dom";
import PostItem from '../PostItem'
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    marginBottom: "4rem",
  },
}));

function SearchPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const posts = useSelector((state) => state.posts.SearchingPosts);

  useEffect(() => {
    dispatch(getPostsByQueryStringAsync(params.querySting));
  }, [params.querySting]);

  return (
    <div>
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={12}>
              <h1>co {posts.length} ket qua cho "{params.querySting}" </h1>
            {posts.map((item) => (
              <PostItem key={item.PID} item={item} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SearchPage;
