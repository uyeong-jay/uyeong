import getPosts from "./getPosts";
import createPost from "./createPost";
import getPostsByCategory from "./getPostsByCategory";
import getPost from "./getPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const postCtrl = {
  getPosts,
  getPost,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
};

export default postCtrl;
