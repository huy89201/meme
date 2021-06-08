import React, { useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByQueryStringAsync } from "../../store/postsActions";
import { useParams } from "react-router-dom";
import PostItem from "../PostItem";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#fff",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
}));

function SearchPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const posts = useSelector((state) => state.posts.SearchingPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPostsByQueryStringAsync(params.querySting)).then(
      (res) => res.ok && setIsLoading(false)
    );
    // eslint-disable-next-line
  }, [params.querySting]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isLoading ? (
          <>
            <h1 className={classes.title}>
              co {posts.length} ket qua cho "{params.querySting}"{" "}
            </h1>
            {posts.map((item) => (
              <PostItem key={item.PID} item={item} />
            ))}
          </>
        ): <Loading/>
        }
      </Grid>
    </Grid>
  );
}

export default SearchPage;
