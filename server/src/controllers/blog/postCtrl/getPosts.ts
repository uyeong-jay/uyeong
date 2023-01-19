import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    //category가 생성된 순서로 가져오기(가장 최근에 생성된것이 가장 첫번째)
    //{createdAt: 1}
    const posts = await Posts.find().sort({ createdAt: -1 });

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
