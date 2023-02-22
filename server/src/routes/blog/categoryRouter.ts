import express from "express";
import blogCategoryCtrl from "@controllers/blogCtrl/categoryCtrl";
import auth from "@middleware/auth";

const blogCategoryRouter = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = blogCategoryCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
blogCategoryRouter
  .route("/blog/category")
  .get(getCategories)
  .post(auth, createCategory)
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory);

export default blogCategoryRouter;
