import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPostsBySearch = async (req: Request, res: Response) => {
  try {
    if (!req.query.q) return res.status(200).json({ posts: await Posts.find().sort({ createdAt: -1 }), msg: "No query" });

    const posts = await Posts.find({
      $or: [
        { title: { $regex: req.query.q } }, //$regex: 부분일치도 검색되도록 함
        { content: { $regex: req.query.q } },
        { description: { $regex: req.query.q } },
        { tags: { $in: [req.query.q] } }, //정확히 일치 할때만
      ],
    }).sort({ createdAt: -1 });

    if (!posts.length) return res.status(200).json({ msg: "No blogs" });

    res.status(200).json({ posts, msg: "Seaeched!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsBySearch;

//client 가 받을 데이터
