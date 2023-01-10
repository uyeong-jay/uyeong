import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    const posts = await Posts.aggregate([
      // Category 데이터 추가
      {
        $lookup: {
          from: "categories", //가져올 db 이름
          localField: "category", //posts db 내부 category
          foreignField: "name", //posts db 내부 category.name
          as: "category",
        },
      },
      // array -> object
      { $unwind: "$category" },

      // Sorting
      { $sort: { createdAt: 1 } },
    ]);

    res.status(200).json({ posts });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPosts;

//client 가 받을 데이터
// {
//   "posts": [
//     {
//         "_id": "포스트_id1",
//         "title": "",
//         "tags": [""],
//         "content": "",
//         "description": "",
//         "thumbnail": "",
//         "privacy": true,
//         "category": {
//             "_id": "카테고리 _id",
//             "name": "js",
//             "createdAt": "",
//             "updatedAt": "",
//             "__v": 0
//         },
//         "createdAt": "",
//         "updatedAt": "",
//         "__v": 0
//     },
//     {
//         "_id": "포스트_id2",
//         "title": "",
//         "tags": [""],
//         "content": "",
//         "description": "",
//         "thumbnail": "",
//         "privacy": true,
//         "category": {
//             "_id": "카테고리_id",
//             "name": "js",
//             "createdAt": "",
//             "updatedAt": "",
//             "__v": 0
//         },
//         "createdAt": "",
//         "updatedAt": "",
//         "__v": 0
//     }
//   ]
// }
