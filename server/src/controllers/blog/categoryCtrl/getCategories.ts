import { Request, Response } from "express";
import Categories from "@models/blog/categoryModel";

const getCategories = async (req: Request, res: Response) => {
  try {
    //category를 가장 최근에 생성된것이 가장 첫번째에 오도록 가져오기
    const categories = await Categories.find().sort({ createdAt: -1 });

    res.status(200).json({ categories });
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
