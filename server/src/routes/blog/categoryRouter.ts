import express from "express";
import blogCategoryCtrl from "@controllers/blogCtrl/categoryCtrl";
import auth from "@middleware/auth";

const blogCategoryRouter = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = blogCategoryCtrl;

blogCategoryRouter
  .route("/blog/category")
  .get(getCategories)
  .post(auth, createCategory)
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory);

export default blogCategoryRouter;
