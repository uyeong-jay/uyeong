import { Request, Response } from "express";
import Categories from "@models/blog/categoryModel";

const getCategories = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //category가 생성된 순서로 가져오기
    const categories = await Categories.find().sort("-createAt");

    res.status(200).json({ categories });
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
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getCategories;
