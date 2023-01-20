import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPost = async (req: Request, res: Response) => {
  try {
    //post 데이터 가져오기(slug = psot 제목)
    const post = await Posts.findOne({ titleForUrl: req.params.slug });

    res.status(200).json({ post });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPost;

//client 가 받을 데이터
// {
//   "post": {
//       "_id": "",
//       "title": "Web1",
//       "tags": [],
//       "content": "",
//       "description": "",
//       "privacy": false,
//       "category": "web",
//       "createdAt": "",
//       "updatedAt": "",
//       "__v": 0
//   }
// }
