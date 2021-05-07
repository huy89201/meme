import userService from '../service/userService'

export const ACT_GET_USER_BY_ID = 'GET_USER_BY_ID';

export function getUserById(user){
    return {
        type: ACT_GET_USER_BY_ID,
        payload: {user: user},
    }
}

export function getUserByIdAsync(userId){
    return async (dispatch) => {
        try {
            const res = await userService.getUserById(userId);
            const user = res.data.user;
            
            dispatch(getUserById(user));
        } catch (error) {
            console.log(error);
        }
    }
}