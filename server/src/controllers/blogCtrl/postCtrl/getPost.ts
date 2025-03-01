import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";
import mongoose from "mongoose";

const getPost = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params; // id or slug

    // ObjectId 형식인지 확인
    const postQuery = mongoose.Types.ObjectId.isValid(identifier)
      ? Posts.findById(identifier) // get post for editing (write page)
      : Posts.findOne({ titleForUrl: identifier }); // get post for viewing (blog page)

    const post = await postQuery;
    if (!post) return res.status(200).json({ msg: "You can write new post." });

    const commentCount = await Comments.countDocuments({ post_id: post._id });

    const postWithCommentCount = {
      ...post.toObject(),
      commentCount,
    };

    res.status(200).json({ post: postWithCommentCount });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPost;
