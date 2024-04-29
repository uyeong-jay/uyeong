import express from "express";
import blogCommentCtrl from "@controllers/blogCtrl/commentCtrl";
import auth from "@middleware/auth";

const blogCommentRouter = express.Router();
const { createComment, getComments, updateComment, deleteComment, createReply } = blogCommentCtrl;

blogCommentRouter.get("/comment/blog/:slug", getComments);
blogCommentRouter.post("/comment", auth, createComment);
blogCommentRouter.post("/reply", auth, createReply);
blogCommentRouter.patch("/comment/:id", auth, updateComment);
blogCommentRouter.delete("/comment/:id", auth, deleteComment);

export default blogCommentRouter;
