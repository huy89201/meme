import categoriesService from '../service/categoriesService'

export const ACT_GET_CATEGORIES = 'ACT_GET_CATEGORIES'

export function getCategories(categories){
    return {
        type: ACT_GET_CATEGORIES,
        payload: {categories}
    }
}

export function getCategoriesAsync(){
    return async dispatch => {
        try {
            const res = await categoriesService.getCategories();
            const categories = res.data.categories;
            
            dispatch(getCategories(categories));
        } catch (error) {
            console.log(error)
        }
    }
}