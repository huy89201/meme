import {combineReducers} from 'redux';
import postsReducer from './postsReducer'
import userRecuder from './userRecuder';
import commentsReducer from './commentsReducer'
import categoriesReducer from './categoriesReducer'

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userRecuder,
    comments: commentsReducer,
    categories: categoriesReducer
})

export default rootReducer