import {combineReducers} from 'redux';
import postsReducer from './postsReducer'
import userRecuder from './userRecuder';
import commentsReducer from './commentsReducer'

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userRecuder,
    comments: commentsReducer
})

export default rootReducer