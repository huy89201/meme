import {
  ACT_GET_NEWS_POST,
  ACT_GET_NEWS_POST_BY_CATEGORY,
} from "./postsActions";

const initState = {
  posts: [],
  categoryPosts: [],
};

export default function postsReducer(state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_NEWS_POST:
      return {
        ...state,
        posts: actions.payload.posts,
      };
    
    case ACT_GET_NEWS_POST_BY_CATEGORY:
        return {
            ...state,
            categoryPosts: actions.payload.posts
        }

    default:
      return state;
  }
  // return state;
}
