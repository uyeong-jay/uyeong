import express from "express";
import categoryCtrl from "@controllers/categoryCtrl";
import auth from "@middleware/auth";

const categoryRouter = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = categoryCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거

categoryRouter
	.route("/blog/category")
	.get(getCategories)
	.post(auth, createCategory)
	.patch(auth, updateCategory)
	.delete(auth, deleteCategory);

export default categoryRouter;

// const router = express.Router();
// router.route("/blog/category").get(getCategories).post(auth, createCategory);
// router.route("/blog/category/:slug").patch(auth, updateCategory).delete(auth, deleteCategory);
// export default router;
