import express from "express";
import blogPostCtrl from "@controllers/blogCtrl/postCtrl";
import auth from "@middleware/auth";

const blogPostRouter = express.Router();
const { getPosts, getPost, getPostsByCategory, getPostsBySearch, createPost, updatePost, deletePost, getTags } =
  blogPostCtrl;

blogPostRouter.get("/search", getPostsBySearch);
blogPostRouter.get("/tag", getTags);
blogPostRouter.get("/blog", getPosts);
blogPostRouter.get("/blog/:slug", getPost);
blogPostRouter.get("/blog/category/:slug", getPostsByCategory);
blogPostRouter.post("/blog", auth, createPost);
blogPostRouter.patch("/blog", auth, updatePost);
blogPostRouter.delete("/blog", auth, deletePost);

export default blogPostRouter;
