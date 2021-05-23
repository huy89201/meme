import postsService from "../service/postsService";

export const ACT_GET_NEWS_POST = "ACT_GET_NEWS_POST";
export const ACT_GET_NEWS_POST_BY_CATEGORY = "ACT_GET_NEWS_POST_BY_CATEGORY";
export const ACT_GET_CURRENT_USER_POSTS = "ACT_GET_CURRENT_USER_POSTS";
export const ACT_GET_NEWS_POST_BY_QUERY_STRING = "ACT_GET_NEWS_POST_BY_QUERY";
export const ACT_GET_NEWS_POST_BY_PID = "ACT_GET_NEWS_POST_BY_PID";
export const ACT_RESET_CURRENT_PAGE = "ACT_RESET_CURRENT_PAGE";
// export const ACT_ADD_NEW_POST = "ACT_ADD_NEWS_POST";

export function getNewPosts({ posts, pagesize, currPage }) {
  return {
    type: ACT_GET_NEWS_POST,
    payload: {
      posts,
      pagesize,
      currPage,
    },
  };
}

export function getNewPostsAsync(pagesize = 3, currPage = 1) {
  return async (dispatch) => {
    try {
      const rest = await postsService.getNewPosts(pagesize, currPage);
      const data = rest.data.posts;

      dispatch(
        getNewPosts({
          posts: data,
          pagesize: pagesize,
          currPage: currPage,
        })
      );

      return { ok: true };
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNewPostsByCategory(posts) {
  return {
    type: ACT_GET_NEWS_POST_BY_CATEGORY,
    payload: posts,
  };
}

export function getNewPostsByCategoryAsync(tagIndex) {
  return async (dispatch) => {
    try {
      const rest = await postsService.getNewPostsByCategory({ tagIndex });
      const data = rest.data.posts;

      dispatch(getNewPostsByCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPostsByUserId(posts) {
  return {
    type: ACT_GET_CURRENT_USER_POSTS,
    payload: {
      posts: posts,
    },
  };
}

export function getPostsByUserIdAsync(userId) {
  return async (dispatch) => {
    try {
      const res = await postsService.getPostsByUserId(userId);
      const posts = res.data.posts;

      dispatch(getPostsByUserId(posts));
    } catch (error) {
      console.log("loi ne: " + error);
    }
  };
}

export function getPostsByQueryString(posts) {
  return {
    type: ACT_GET_NEWS_POST_BY_QUERY_STRING,
    payload: { posts },
  };
}

export function getPostsByQueryStringAsync(queryString) {
  return async (dispatch) => {
    try {
      const res = await postsService.getPostsByQueryString(queryString);
      dispatch(getPostsByQueryString(res.data.posts));

      return { ok: true };
    } catch (error) {}
  };
}

export function getPostByPostId(post, categories) {
  return {
    type: ACT_GET_NEWS_POST_BY_PID,
    payload: {
      post: post,
      categories: categories,
    },
  };
}

export function getPostByPostIdAsync(postId) {
  return async (dispatch) => {
    try {
      const res = await postsService.getPostByPostId(postId);
      const post = res.data.data.post;
      const categories = res.data.data.categories;

      dispatch(getPostByPostId(post, categories));

      return { ok: true };
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetCurrentPage() {
  return {
    type: ACT_RESET_CURRENT_PAGE,
  };
}

export function addNewPostAsync(formData) {
  return async () => {
    try {
      await postsService.addNewPost(formData);
      return { ok: true};
    } catch (error) {
      return error;
    }
  };
}
