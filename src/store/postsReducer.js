import {
  ACT_GET_NEWS_POST,
  ACT_GET_NEWS_POST_BY_CATEGORY,
  ACT_GET_CURRENT_USER_POSTS,
  ACT_GET_NEWS_POST_BY_QUERY_STRING,
  ACT_GET_NEWS_POST_BY_PID,
  ACT_RESET_CURRENT_PAGE,
} from "./postsActions";

const initState = {
  currentUserPosts: [],
  postPaging: {
    postList: [],
    pagesize: 3,
    currPage: 1,
  },
  SearchingPosts: [],
  postDetail: {
    post: {},
    categories: [],
  },
};

export default function postsReducer(state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_NEWS_POST:
      return {
        ...state,
        postPaging: {
          postList:
            actions.payload.currPage === 1
              ? actions.payload.posts
              : [...state.postPaging.postList, ...actions.payload.posts],
          pagesize: actions.payload.pagesize,
          currPage: actions.payload.currPage + 1,
        },
      };

    case ACT_GET_NEWS_POST_BY_CATEGORY:
      return {
        ...state,
        postPaging: {
          ...state.postPaging,
          postList:
            actions.payload.currPage === 1
              ? actions.payload.posts
              : [...state.postPaging.postList, ...actions.payload.posts],
          pagesize: actions.payload.pagesize,
          currPage: actions.payload.currPage + 1,
        },
      };
    case ACT_GET_CURRENT_USER_POSTS:
      return {
        ...state,
        currentUserPosts: actions.payload.posts,
      };
    case ACT_GET_NEWS_POST_BY_QUERY_STRING:
      return {
        ...state,
        SearchingPosts: actions.payload.posts,
      };
    case ACT_GET_NEWS_POST_BY_PID:
      return {
        ...state,
        postDetail: {
          post: actions.payload.post,
          categories: actions.payload.categories,
        },
      };
    case ACT_RESET_CURRENT_PAGE:
      return {
        ...state,
        postPaging: {
          ...state.postPaging,
          currPage: 1,
          postList: [],
        },
      };

    default:
      return state;
  }
}
