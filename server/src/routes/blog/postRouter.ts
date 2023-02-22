import express from "express";
import blogPostCtrl from "@controllers/blogCtrl/postCtrl";
import auth from "@middleware/auth";

const blogPostRouter = express.Router();
const { getPosts, getPost, getPostsByCategory, createPost } = blogPostCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogPostRouter.get("/blog", getPosts);
blogPostRouter.post("/blog", auth, createPost);

blogPostRouter.get("/blog/:slug", getPost);

blogPostRouter.get("/blog/category/:slug", getPostsByCategory);

export default blogPostRouter;
