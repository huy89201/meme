import commentsService from '../service/commentsServices'

export const ACT_GET_COMMENT_BY_POST_ID = 'GET_COMMENT_BY_POST_ID';

export function getCommentsByPostId(comments){
    return {
        type: ACT_GET_COMMENT_BY_POST_ID,
        payload: {comments}
    }
}

export function getCommentsByPostIdAsync(postId){
    return async (dispatch) => {
        try {
            const res = await commentsService.getCommentsByPostId(postId);
            const comments = res.data.comments;
            
            dispatch(getCommentsByPostId(comments));
        } catch (error) {
            console.log(error);
        }
    }
}