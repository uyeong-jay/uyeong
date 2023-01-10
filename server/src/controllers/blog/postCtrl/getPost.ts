import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPost = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    const post = await Posts.findOne({ title: req.params.slug });

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
