import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 }); //최근에 생성된것이 처음에 오도록

    res.status(200).json({ posts: posts });
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
