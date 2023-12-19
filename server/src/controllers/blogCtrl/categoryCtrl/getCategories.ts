import { Request, Response } from "express";
import Categories from "@models/blog/categoryModel";

const getCategories = async (req: Request, res: Response) => {
  try {
    let categories;

    //pagination
    const { page } = req.query;
    const pageNum = Number(page);
    const limit = 4;
    const skip = (pageNum - 1) * limit;
    const sort = "-_id"; //가장 최근 포스트가 먼저 보이도록 정렬
    const total = await Categories.countDocuments({});
    const totalPages = Math.ceil(total / limit);

    if (!pageNum) {
      // 카테고리 페이지 외 사용
      categories = await Categories.find().limit(limit).sort(sort);
    } else {
      // 카테고리 페이지 내 사용 (ssr x)
      categories = await Categories.find().skip(skip).limit(limit).sort(sort);
    }

    if (!categories.length) return res.status(400).json({ msg: "No categories" });

    res.status(200).json({ categories, totalPages });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getCategories;

//client 가 받을 데이터
// {
//   "categories": [
//     {
//       "_id": "636cf054bb72a23dc865d403",
//       "name": "javascript",
//       "createdAt": "2022-11-10T12:36:36.948Z",
//       "updatedAt": "2022-11-10T12:36:36.948Z",
//       "__v": 0
//     },
//     {
//       "_id": "636e075e8944f1a63bab2386",
//       "name": "nodejs",
//       "createdAt": "2022-11-11T08:27:10.586Z",
//       "updatedAt": "2022-11-11T08:27:10.586Z",
//       "__v": 0
//     }
//   ]
// }
