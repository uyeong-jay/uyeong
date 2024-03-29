import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const updateComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { content } = req.body;

    //comment 조회 후 업데이트
    const comment = await Comments.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { content });

    if (!comment) return res.status(400).json({ msg: "Comment doesn't exits." });

    res.status(200).json({ msg: "Updated successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updateComment;
