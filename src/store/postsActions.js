import postsService from "../service/postsService";

export const ACT_GET_NEWS_POST = "ACT_GET_NEWS_POST";
export const ACT_GET_NEWS_POST_BY_CATEGORY = "ACT_GET_NEWS_POST_BY_CATEGORY";
export const ACT_GET_CURRENT_USER_POSTS = "ACT_GET_CURRENT_USER_POSTS";
export const ACT_GET_NEWS_POST_BY_QUERY_STRING = "ACT_GET_NEWS_POST_BY_QUERY";

export function getNewPosts({ posts, pagesize, currPage }) {
  return {
    type: ACT_GET_NEWS_POST,
    payload: {
      posts,
      pagesize,
      currPage
    },
  };
}

export function getNewPostsAsync(pagesize = 3, currPage = 1) {
  return async (dispatch) => {
    try {
      const rest = await postsService.getNewPosts(pagesize, currPage );
      const data = rest.data.posts;
      
      dispatch(
        getNewPosts({
          posts: data,
          pagesize: pagesize,
          currPage: currPage,
        })
      );

      return {ok : true};

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
    payload: {posts}
  }
}

export function getPostsByQueryStringAsync(queryString){
    return async (dispatch) => {
      try { 
        const res = await postsService.getPostsByQueryString(queryString);
        dispatch(getPostsByQueryString(res.data.posts));

        return { ok : true}
      } catch (error) {

      }
    }
 }