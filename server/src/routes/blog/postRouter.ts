import express from "express";
import blogPostCtrl from "@controllers/blogCtrl/postCtrl";
import auth from "@middleware/auth";

const blogPostRouter = express.Router();
const { getPosts, getPost, getPostsByCategory, getPostsBySearch, createPost, updatePost, deletePost } = blogPostCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogPostRouter.get("/search", getPostsBySearch);
blogPostRouter.get("/blog", getPosts);
blogPostRouter.get("/blog/:slug", getPost);
blogPostRouter.get("/blog/category/:slug", getPostsByCategory);
blogPostRouter.post("/blog", auth, createPost);
blogPostRouter.patch("/blog", auth, updatePost);
blogPostRouter.delete("/blog", auth, deletePost);

export default blogPostRouter;
