import {
  ACT_GET_NEWS_POST,
  ACT_GET_NEWS_POST_BY_CATEGORY,
  ACT_GET_CURRENT_USER_POSTS,
  ACT_GET_NEWS_POST_BY_QUERY_STRING
} from "./postsActions";

const initState = {
  currentUserPosts: [],
  postPaging: {
    postList: [],
    pagesize: 3,
    curPage: 1,
  },
  SearchingPosts: [],
};

export default function postsReducer(state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_NEWS_POST:
      return {
        ...state,
        postPaging: {
          postList:
            actions.payload.curPage === 1
              ? actions.payload.posts
              : [...state.postPaging.postList, ...actions.payload.posts],
          pagesize: actions.payload.pagesize,
          curPage: actions.payload.currPage + 1
        },
      };

    case ACT_GET_NEWS_POST_BY_CATEGORY:
      return {
        ...state,
        categoryPosts: actions.payload.posts,
      };
    case ACT_GET_CURRENT_USER_POSTS:
      return {
        ...state,
        currentUserPosts: actions.payload.posts,
      };
    case ACT_GET_NEWS_POST_BY_QUERY_STRING :
      return {
        ...state,
        SearchingPosts: actions.payload.posts
      }
    default:
      return state;
  }
}
