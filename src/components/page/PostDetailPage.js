import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPostIdAsync } from "../../store/postsActions";
import { makeStyles, Grid, Card, Typography } from "@material-ui/core";
import { getUserByIdAsync } from "../../store/userActions";
import PostItem from "../PostItem";
import CommentInput from "../CommentInput";
import PostComments from "../PostComments";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  categories: {
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#081229",
  },
  categoriesTitle: {
    fontSize: "2rem",
    color: "#ec5990",
  },
  categoriesItem: {
    color: "#fff",
    margin: "0.25rem 0",
  },
  error: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.25rem",
    display: "inline-block",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
  loginLink: {
    color: "#ec5990",
  },
}));

function PostDetailPage() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.posts.postDetail);
  const currentUser = useSelector((state) => state.user.currentUser);

  const post = postDetail.post;
  const categories = postDetail.categories;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  // console.log(post);

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

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          {/* bug: Failed prop type: Invalid prop `children` supplied to `ForwardRef(Grid)`, expected a ReactNode. */}
          {(!isLoading || !isLoading2) ? (
            <div>
              <PostItem item={post} />
              <Card className={classes.categories}>
                <h1 className={classes.categoriesTitle}>Danh mục</h1>
                {categories.map((item) => (
                  <p key={item.TAG_ID} className={classes.categoriesItem}>
                    {item.tag_value}
                  </p>
                ))}
              </Card>
              {currentUser.token ? (
                <CommentInput PID={post.PID} />
              ) : (
                <>
                  <Typography className={classes.error}>
                    Bạn cần đăng nhập để bình luận
                  </Typography>
                  <Link to="/login" className={classes.loginLink}>
                    đăng nhập
                  </Link>
                </>
              )}
              <Card className={classes.Card}>
                <PostComments PID={post.PID} />
              </Card>
            </div>
          ): <Loading/> 
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default PostDetailPage;
