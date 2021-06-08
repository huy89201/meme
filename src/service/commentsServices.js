import api from "./api";

export const commentsService = {
  getCommentsByPostId(postId) {
    return api.get("/comment/comments.php", {
      params: {
        postid: postId,
      },
    });
  },
  postNewComment(comment, postid, token) {
    return api.post(
      "/comment/add_new.php",
      {
        comment: comment,
        postid: postid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default commentsService;
