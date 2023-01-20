import authRouter from "./authRouter";
import userRouter from "./uerRouter";
import blogCategoryRouter from "./blog/categoryRouter";
import blogPostRouter from "./blog/postRouter";
import blogCommentRouter from "./blog/commentRouter";

const routes = {
  authRouter,
  userRouter,
  blogCategoryRouter,
  blogPostRouter,
  blogCommentRouter,
};

export default routes;
