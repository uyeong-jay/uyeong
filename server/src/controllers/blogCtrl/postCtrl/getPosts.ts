import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPosts = async (req: Request, res: Response) => {
  try {
    //Posts를 가장 최근에 생성된것이 가장 첫번째에 오도록 가져오기
    const sortedPosts = await Posts.find().sort({ createdAt: -1 });

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

    res.status(200).json({ posts: postsWithCommentCounts });
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
