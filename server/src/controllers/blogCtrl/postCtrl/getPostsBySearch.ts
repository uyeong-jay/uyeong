import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPostsBySearch = async (req: Request, res: Response) => {
  try {
    if (!req.query.q) {
      const sortedPosts = await Posts.find().sort({ createdAt: -1 });

      // 각 포스트에 대한 댓글 수를 가져오기
      const postWithCommentCounts = await Promise.all(
        sortedPosts.map(async (post) => {
          const commentCount = await Comments.countDocuments({ post_title: post.title });
          return {
            ...post._doc,
            commentCount, // 댓글 수를 포함
          };
        })
      );

      return res.status(200).json({ posts: postWithCommentCounts, msg: "No query" });
    }

    const sortedPosts = await Posts.find({
      $or: [
        { title: { $regex: req.query.q } }, //$regex: 부분일치도 검색되도록 함
        { content: { $regex: req.query.q } },
        { description: { $regex: req.query.q } },
        { tags: { $in: [req.query.q] } }, //정확히 일치 할때만
      ],
    }).sort({ createdAt: -1 });

    if (!sortedPosts.length) return res.status(200).json({ msg: "No blogs" });

    // 각 포스트에 대한 댓글 수를 가져오기
    const postWithCommentCounts = await Promise.all(
      sortedPosts.map(async (post) => {
        const commentCount = await Comments.countDocuments({ post_title: post.title });
        return {
          ...post._doc,
          commentCount, // 댓글 수를 포함
        };
      })
    );

    res.status(200).json({ posts: postWithCommentCounts, msg: "Seaeched!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsBySearch;

//client 가 받을 데이터
