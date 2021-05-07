import {ACT_GET_USER_BY_ID} from './userActions'

const initState = {
    currentUser : {},
    user : {},
}


export default function userRecuder(state = initState, actions){
    switch(actions.type){
        case ACT_GET_USER_BY_ID:
            return {
                ...state,
                user: actions.payload.user
            } 
        default: return state;
    }
}

