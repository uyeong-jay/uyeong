import { createCategory } from "./createCategory";
import { deleteCategory } from "./deleteCategory";
import { getCategories } from "./getCategories";
import { updateCategory } from "./updateCategory";

const categoryCtrl = {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory,
};

export default categoryCtrl; //index 파일(default)
