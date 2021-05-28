import categoriesService from "../service/categoriesService";

export const ACT_GET_CATEGORIES = "ACT_GET_CATEGORIES";
export const ACT_CHECKED = "ACT_CHECKED";
export const ACT_RESET_CHECKED = "ACT_RESET_CHECKED";
export const ACT_SINGLE_CHECKED = "ACT_SINGLE_CHECKED";

export function getCategories(categories) {
  return {
    type: ACT_GET_CATEGORIES,
    payload: { categories },
  };
}

export function getCategoriesAsync() {
  return async (dispatch) => {
    try {
      const res = await categoriesService.getCategories();
      const categories = res.data.categories;

      dispatch(getCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
}

export function checked(id) {
  return {
    type: ACT_CHECKED,
    payload: { id },
  };
}

export function resetChecked() {
  return {
    type: ACT_RESET_CHECKED,
  };
}

export function singleChecked(id) {
  return {
    type: ACT_SINGLE_CHECKED,
    payload: {id},
  };
}
