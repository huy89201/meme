import { ACT_GET_COMMENT_BY_POST_ID } from "./commentsActions";

const initState = {
  comments: [],
};

export default function CommentsReducer (state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_COMMENT_BY_POST_ID:
      return {
        ...state.comments,
        comments: actions.payload.comments
      }

    default: return state;
  }
}
