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
  getNewPostsByCategory(pagesize = 3, currPage = 1, tagIndex) {
    return api.get("/post/getListByCategory.php", {
      params: {
        pagesize: pagesize,
        currPage: currPage,
        tagIndex: tagIndex,
      },
    });
  },
  getPostsByUserId(id, token) {
    return api.get("/post/getListPostUserID.php", {
      params: {
        userid: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getPostsByQueryString(queryString) {
    return api.get("/post/search.php", {
      params: {
        query: queryString,
      },
    });
  },
  getPostByPostId(postId) {
    return api.get("/post/post.php", {
      params: {
        postid: postId,
      },
    });
  },
  addNewPost(formData,token) {
    return api.post("/post/addNew.php", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // edditPost({ obj_image, url_image, post_content, category } = {}) {
  //   return api.post("/post/addNew.php", {
  //     obj_image: obj_image,
  //     url_image: url_image,
  //     post_content: post_content,
  //     category: category,
  //   });
  // },
};

export default postsService;
