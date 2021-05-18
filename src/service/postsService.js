import api from "./api";

const postsService = {
  getNewPosts(pagesize = 3, currPage = 1) {
    return api.get("/post/getListPagination.php", {
      params: {
        pagesize: pagesize,
        currPage: currPage,
      },
    });
  },
  getNewPostsByCategory({ pagesize = 3, currPage = 1, tagIndex } = {}) {
    return api.get("/post/getListByCategory.php", {
      params: {
        pagesize: pagesize,
        currPage: currPage,
        tagIndex: tagIndex,
      },
    });
  },
  getPostsByUserId(id) {
    return api.get("/post/getListPostUserID.php", {
      params: {
        userid: id,
      },
    });
  },
  getPostsByQueryString(queryString){
    return api.get('/post/search.php',{
      params: {
        query: queryString
      }
    })
  },
  getPostByPostId(postId) {
    return api.get("/post/post.php", {
      params: {
        postid: postId
      }
    })
  }
};

export default postsService;
