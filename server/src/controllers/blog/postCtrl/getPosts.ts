import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    const posts = await Posts.aggregate([
      // User 데이터 추가
      {
        $lookup: {
          from: "users", //가져올 db 이름
          let: { user_id: "$user" }, // posts db 내부 user (이름은 user_id 로 지정)
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$user_id"] } } }, { $project: { password: 0 } }], //_id로 user(user_id) 데이터 불러오기 / password 제외
          as: "user",
        },
      },
      // array -> object
      { $unwind: "$user" },

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
      { $sort: { createdAt: -1 } },

      // // Group by category
      // {
      //   $group: {
      //     _id: "$category._id", //1. _id: ''
      //     name: { $first: "$category.name" }, //2. name: ''
      //     posts: { $push: "$$ROOT" }, //3. posts: [{user:{~}, post정보, category:{~} }, {~반복~}]
      //     count: { $sum: 1 }, //4. count: 개수
      //   },
      // },

      // // Pagination(페이지 매기기) for posts
      // {
      //   $project: {
      //     posts: {
      //       $slice: ["$posts", 0, 4],
      //     },
      //     count: 1,
      //     name: 1,
      //   },
      // },
    ]);

    res.status(200).json({ posts });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPosts;

//client 가 받을 데이터
// [
//   {
//       "_id": "카테고리_id", //Group by category
//       "name": "js",
//       "count": 2,
//       "posts": [
//           {
//               "_id": "포스트_id1",
//               "user": {
//                   "_id": "유저_id1",
//                   "nickname": "admin",
//                   "email": "admin@gmail.com",
//                   "avatar": "",
//                   "role": "admin",
//                   "createdAt": "",
//                   "updatedAt": "",
//                   "__v": 0
//               },
//               "title": "",
//               "tags": [""],
//               "content": "",
//               "description": "",
//               "thumbnail": "",
//               "privacy": true,
//               "category": {
//                   "_id": "카테고리 _id",
//                   "name": "js",
//                   "createdAt": "",
//                   "updatedAt": "",
//                   "__v": 0
//               },
//               "createdAt": "",
//               "updatedAt": "",
//               "__v": 0
//           },
//           {
//               "_id": "포스트_id2",
//               "user": {
//                   "_id": "유저_id2",
//                   "nickname": "admin",
//                   "email": "admin@gmail.com",
//                   "avatar": "",
//                   "role": "admin",
//                   "createdAt": "",
//                   "updatedAt": "",
//                   "__v": 0
//               },
//               "title": "",
//               "tags": [""],
//               "content": "",
//               "description": "",
//               "thumbnail": "",
//               "privacy": true,
//               "category": {
//                   "_id": "카테고리_id",
//                   "name": "js",
//                   "createdAt": "",
//                   "updatedAt": "",
//                   "__v": 0
//               },
//               "createdAt": "",
//               "updatedAt": "",
//               "__v": 0
//           }
//       ]
//   },
// ]
