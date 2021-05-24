import {
  ACT_GET_CATEGORIES,
  ACT_CHECKED,
  ACT_RESET_CHECKED,
} from "./categoriesAction";

const initState = {
  categories: [],
};

export default function categoriesReducer(state = initState, actions) {
  switch (actions.type) {
    case ACT_GET_CATEGORIES:
      const hashCategories = [];
      actions.payload.categories.forEach((item) => {
        hashCategories.push({
          key: item.id,
          text: item.text,
          isChecked: false,
        });
      });
      return {
        ...state,
        categories: hashCategories,
      };
    case ACT_CHECKED:
      return {
        ...state,
        categories: state.categories.map((item) => {
          if (item.key === actions.payload.id) item.isChecked = !item.isChecked;

          return item;
        }),
      };
    case ACT_RESET_CHECKED:
      return {
        ...state,
        categories: state.categories.map((item) => {
          item.isChecked = false;

          return item;
        }),
      };
    default:
      return state;
  }
}
