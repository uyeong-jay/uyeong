import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPostsBySeatch = async (req: Request, res: Response) => {
  try {
    if (!req.query.q) return res.status(200).json({ msg: "No query" });

    const posts = await Posts.find({
      $or: [
        { title: { $regex: req.query.q } },
        { content: { $regex: req.query.q } },
        { description: { $regex: req.query.q } },
      ],
    });

    if (!posts.length) return res.status(400).json({ msg: "No blogs" });

    res.status(200).json({ posts, msg: "Seaeched!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsBySeatch;

//client 가 받을 데이터
