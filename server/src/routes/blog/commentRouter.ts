import express from "express";
import blogCommentCtrl from "@controllers/blog/commentCtrl";
import auth from "@middleware/auth";

const blogCommentRouter = express.Router();
const { createComment, getComments, updateComment, deleteComment, createReply, updateReply, deleteReply } =
  blogCommentCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogCommentRouter.get("/comment/blog/:slug", getComments);

blogCommentRouter.post("/comment", auth, createComment);
blogCommentRouter.patch("/comment/:id", auth, updateComment);
blogCommentRouter.delete("/comment/:id", auth, deleteComment);

blogCommentRouter.post("/reply", auth, createReply);
blogCommentRouter.patch("/reply/:id", auth, updateReply);
blogCommentRouter.delete("/reply/:id", auth, deleteReply);

export default blogCommentRouter;
