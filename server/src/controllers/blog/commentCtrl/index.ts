import getComments from "./getComments";
import createComment from "./createComment";
import updateComment from "./updateComment";
import deleteComment from "./deleteComment";
import createReply from "./createReply";
import updateReply from "./updateReply";
import deleteReply from "./deleteReply";

const commentCtrl = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  createReply,
  updateReply,
  deleteReply,
};

export default commentCtrl;
