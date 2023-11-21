import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPostsBySearch = async (req: Request, res: Response) => {
  try {
    let sortedPosts;

    const { page: nextId, q: searchQuery } = req.query;
    const limit = 2;
    const sort = "-_id";
    // "-" >> 가장 최근 포스트가 먼저 보이도록 정렬
    // same with sort({ createdAt: -1 })

    if (!searchQuery) {
      sortedPosts = await Posts.find({
        _id: nextId ? { $lt: nextId } : { $exists: true },
      })
        .limit(limit)
        .sort(sort);
    } else {
      sortedPosts = await Posts.find({
        $and: [
          {
            _id: nextId ? { $lt: nextId } : { $exists: true },
          },
          {
            $or: [
              //$regex: 부분일치도 검색되도록 함
              //$in: 완전일치만 검색되도록 함
              { title: { $regex: req.query.q } },
              { content: { $regex: req.query.q } },
              { description: { $regex: req.query.q } },
              { tags: { $in: [req.query.q] } },
            ],
          },
        ],
      })
        .limit(limit)
        .sort(sort);
    }

    const next_cursor = sortedPosts[limit - 1]?._id.toString() || undefined;

    if (!sortedPosts.length) return res.status(200).json({ msg: "No blogs" });

    // 각 포스트에 대한 댓글 수를 가져오기
    const postsWithCommentCounts = await Promise.all(
      sortedPosts.map(async (post) => {
        const commentCount = await Comments.countDocuments({ post_title: post.title });
        return {
          ...post._doc,
          commentCount, // 댓글 수를 포함
        };
      })
    );

    res.status(200).json({ posts: postsWithCommentCounts, next_cursor, msg: "Seaeched!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsBySearch;

//client 가 받을 데이터
