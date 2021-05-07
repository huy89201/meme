import api from './api'

export const commentsService = {
    getCommentsByPostId(postId){
        return api.get('/comment/comments.php',{
            params: {
                postid: postId
            }
        })
    }
}

export default commentsService;