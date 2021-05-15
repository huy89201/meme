import api from './api'

export const commentsService = {
    getCommentsByPostId(postId){
        return api.get('/comment/comments.php',{
            params: {
                postid: postId
            }
        })
    },
    postNewComment(comment,postid){
        return api.post('/comment/add_new.php',{
            comment: comment,
            postid: postid
        })
    }
}

export default commentsService;