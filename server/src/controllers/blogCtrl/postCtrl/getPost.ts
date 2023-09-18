import { Request, Response } from "express";
import Posts from "@models/blog/postModel";
import Comments from "@models/blog/commentModel";

const getPost = async (req: Request, res: Response) => {
  try {
    //post 데이터 가져오기(slug = post 제목)
    const post = await Posts.findOne({ titleForUrl: req.params.slug });

    // 해당 포스트에 대한 댓글 수 가져오기
    const commentCount = await Comments.countDocuments({ post_title: post?.title });

    // post 객체에 commentCount 추가하여 응답 데이터로 반환
    const postWithCommentCount = {
      ...post?._doc,
      commentCount,
    };

    res.status(200).json({ post: postWithCommentCount });
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
