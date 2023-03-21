import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";
// import { io } from "@src/index";

const createComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { post_id, post_title, content } = req.body;

    //데이터 생성
    const newComment = new Comments({
      post_id,
      post_title,
      user: req.user._id,
      content,
    });

    // io.emit("createComment", content);

    //db에 저장
    await newComment.save();

    res.status(200).json({ msg: "Create Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default createComment;
