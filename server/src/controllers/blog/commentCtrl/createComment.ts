import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const createComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { user_id, content, post_title } = req.body;

    //데이터 생성
    const newComment = new Comments({
      user: user_id,
      content,
      post_title,
    });

    //db에 저장
    await newComment.save();

    res.status(200).json({ newComment, msg: "Create Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default createComment;
