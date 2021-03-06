import {
  ACT_GET_USER_BY_ID,
  ACT_GET_CURRENT_USER,
  ACT_LOG_OUT,
  ACT_SET_TOKEN,
  ACT_SET_ID,
} from "./userActions";

const initState = {
  currentUser: {
    token: "",
    id: "",
    userData: {},
  },
  user: {},
  members: []
};

export default function userRecuder(state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_USER_BY_ID:
      return {
        ...state,
        user: actions.payload.user,
      };
    case ACT_GET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userData: actions.payload.user,
        },
      };
    case ACT_SET_TOKEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          token: actions.payload.token,
        },
      };
    case ACT_SET_ID:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: actions.payload.id,
        },
      };

    case ACT_LOG_OUT:
      return {
        ...state,
        currentUser: {
          token: "",
          id: "",
          userData: {},
        },
      };
    default:
      return state;
  }
}
