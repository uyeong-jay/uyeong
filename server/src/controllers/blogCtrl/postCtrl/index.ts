import getPosts from "./getPosts";
import getPost from "./getPost";
import getTags from "./getTags";
import getPostsBySearch from "./getPostsBySearch";
import getPostsByCategory from "./getPostsByCategory";
import createPost from "./createPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const postCtrl = {
  getPosts,
  getPost,
  getTags,
  getPostsBySearch,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
};

export default postCtrl;
