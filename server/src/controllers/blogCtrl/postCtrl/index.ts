import getPosts from "./getPosts";
import createPost from "./createPost";
import getPostsByCategory from "./getPostsByCategory";
import getPostsBySeatch from "./getPostsBySeatch";
import getPost from "./getPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const postCtrl = {
  getPosts,
  getPost,
  getPostsByCategory,
  getPostsBySeatch,
  createPost,
  updatePost,
  deletePost,
};

export default postCtrl;
