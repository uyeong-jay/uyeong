import express from "express";
import blogCtrl from "@controllers/blogCtrl";
import auth from "@middleware/auth";

const blogRouter = express.Router();
const { createCategory } = blogCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogRouter.post("/blog", auth, createCategory);

export default blogRouter;
