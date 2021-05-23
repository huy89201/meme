import {ACT_GET_CATEGORIES} from './categoriesAction'

const initState = {
    categories: [],
}

export default function categoriesReducer(state = initState, actions){
    switch (actions.type) {
        case ACT_GET_CATEGORIES:
             return {
                 ...state,
                categories: actions.payload.categories
             }

        default : return state;
    }
}