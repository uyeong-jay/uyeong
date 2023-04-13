import getPosts from "./getPosts";
import createPost from "./createPost";
import getPostsByCategory from "./getPostsByCategory";
import getPostsBySearch from "./getPostsBySearch";
import getPost from "./getPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const postCtrl = {
  getPosts,
  getPost,
  getPostsByCategory,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
};

export default postCtrl;
