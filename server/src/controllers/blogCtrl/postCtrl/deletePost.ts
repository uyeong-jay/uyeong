import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";
import Posts from "@models/blog/postModel";

const deletePost = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { _id: postId } = req.body;

    //post 조회 후 삭제
    const post = await Posts.findOneAndDelete({ _id: postId });
    if (!post) return res.status(400).json({ msg: "Invalid Authentication." });

    //comments 조회 후 삭제
    const comment = await Comments.deleteMany({ post_id: postId });
    if (!comment) return res.status(400).json({ msg: "Invalid Authentication." });

    res.status(200).json({ msg: "Delete Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default deletePost;
