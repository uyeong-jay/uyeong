import { Request, Response } from "express";
import Categories from "@models/blog/categoryModel";

const getCategories = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //category가 생성된 순서로 가져오기(가장 최근에 생성된것이 가장 첫번째)
    const categories = await Categories.find().sort("-createAt");

    // const categories = await Categories.aggregate([
    //   // {
    //   //   $lookup: {
    //   //     from: "posts", //가져올 db 이름
    //   //     localField: "post", //posts db 내부 category
    //   //     foreignField: "_id", //posts db 내부 category.name
    //   //     as: "post",
    //   //   },
    //   // },
    //   // {
    //   //   $lookup: {
    //   //     from: "posts", //가져올 db 이름
    //   //     let: { post_id: "$post" }, // posts db 내부 user (이름은 post_id 로 지정)
    //   //     pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$post_id"] } } }],
    //   //     as: "post",
    //   //   },
    //   // },
    //   // // Group
    //   // {
    //   //   $group: {
    //   //     _id: "$category._id", //1. _id: ''
    //   //     name: { $first: "$category.name" }, //2. name: ''
    //   //     count: { $sum: 1 }, //4. count: 개수
    //   //   },
    //   // },
    // ]);

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
