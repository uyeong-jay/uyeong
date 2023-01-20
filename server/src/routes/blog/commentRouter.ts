import express from "express";
import blogCommentCtrl from "@controllers/blog/commentCtrl";
import auth from "@middleware/auth";

const blogCommentRouter = express.Router();
const { createComment, getComments, updateComment, deleteComment } = blogCommentCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogCommentRouter.post("/comment", auth, createComment);

export default blogCommentRouter;
