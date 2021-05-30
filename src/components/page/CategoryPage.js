import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoriesItem from "../CategoriesItem";
import { useParams } from "react-router-dom";
import {
  checked,
  resetChecked,
  singleChecked,
} from "../../store/categoriesAction";
import {
  getNewPostsByCategoryAsync,
  resetCurrentPage,
} from "../../store/postsActions";
import { Container, makeStyles, Grid, Button } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../PostItem";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    marginBottom: "4rem",
  },
  displayNone: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function CategoryPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const categories = useSelector((state) => state.categories.categories);
  const postPaging = useSelector((state) => state.posts.postPaging);
  const [key, setKey] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { currPage, pagesize, postList } = postPaging;
  const { tagIndex } = params;

  useEffect(() => {
    dispatch(getNewPostsByCategoryAsync(3, 1, tagIndex));

    return () => {
      dispatch(resetCurrentPage());
      
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setKey(tagIndex), [tagIndex]);

  function handleCategories(evt) {
    const value = evt.target.value;

    dispatch(checked(Number(value)));
    dispatch(singleChecked(Number(value)));
    setKey(value);
  }

  async function handleSubmit() {
    if (!key) return;

    await dispatch(getNewPostsByCategoryAsync(3, 1, key)).then((res) => {
      if (res.ok) {
        dispatch(resetChecked());
      }
    });
  }

  const fetchMoreData = async () => {
    if (isFetching) return;

    setIsFetching(true);

    await dispatch(getNewPostsByCategoryAsync(pagesize, currPage, key)).then(
      (res) => {
        res.ok && setIsFetching(false);
      }
    );
  };

  return (
    <Container className={classes.container}>
      <div className={classes.displayNone}>
        <Grid container>
          {categories.map((item) => (
            <CategoriesItem
              key={item.key}
              id={item.key}
              title={item.text}
              isChecked={item.isChecked}
              handleCategories={handleCategories}
            />
          ))}
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          let's gooo
        </Button>
      </div>
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
    </Container>
  );
}

export default CategoryPage;
