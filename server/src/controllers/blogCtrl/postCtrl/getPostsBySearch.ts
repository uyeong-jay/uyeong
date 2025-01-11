import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPostsBySearch = async (req: Request, res: Response) => {
  try {
    let posts;

    //pagination (infinite scroll)
    const { page: nextId, q: searchQuery } = req.query;
    const limit = 4;
    const sort = "-_id";
    // "-": 가장 최근 포스트가 먼저 보이도록 정렬 - same with sort({ createdAt: -1 })

    if (!searchQuery) {
      posts = await Posts.find({
        _id: nextId ? { $lt: nextId } : { $exists: true },
      })
        .limit(limit)
        .sort(sort);
    } else {
      posts = await Posts.find({
        $and: [
          {
            _id: nextId ? { $lt: nextId } : { $exists: true },
          },
          {
            $or: [
              //$regex: 부분일치도 검색
              //$in: 완전일치만 검색
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

    const next_cursor = posts[limit - 1]?._id.toString() || undefined;

    if (!posts.length) return res.status(200).json({ hasMatchingPost: false, msg: "No posts" });

    // 각 포스트에 대한 댓글 수를 가져오기 (post 4개씩 적용)
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comments.countDocuments({ post_title: post.titleForUrl });
        return {
          ...post._doc,
          commentCount, // 댓글 수 포함
        };
      })
    );

    res.status(200).json({ posts: postsWithCommentCount, next_cursor, hasMatchingPost: true, msg: "Searched!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsBySearch;
