import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    const { limit: maxPosts } = req.query;
    const posts = await Posts.find({ privacy: false }).sort({ createdAt: -1 }).limit(Number(maxPosts)); //최근 포스트 순

    res.status(200).json({ posts });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPosts;
