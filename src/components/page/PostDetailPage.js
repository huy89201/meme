import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPostIdAsync } from "../../store/postsActions";
import { makeStyles, Grid } from "@material-ui/core";
import { getUserByIdAsync } from "../../store/userActions";
import PostDetailItem from "../PostDetailItem";

const useStyles = makeStyles((theme) => ({}));

function PostDetailPage() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.posts.postDetail);
  const user = useSelector((state) => state.user.user);

  const post = postDetail.post;
  const categories = postDetail.categories;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPostByPostIdAsync(params.PID)).then(
      (res) => res.ok && setIsLoading(false)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsLoading2(true);
    dispatch(getUserByIdAsync(post.USERID)).then(
      (res) => res.ok && setIsLoading2(false)
    );
    // eslint-disable-next-line
  }, [post.USERID]);

  //bug: khi bấm vào postItem ở searchPage thì user load xong reset về  undefine
  // bấm hồi đéo bị :D ???
  
  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          {/* bug: Failed prop type: Invalid prop `children` supplied to `ForwardRef(Grid)`, expected a ReactNode. */}
          {isLoading || isLoading2 || (
            <PostDetailItem user={user} post={post} categories={categories} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default PostDetailPage;
