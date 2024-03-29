import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const createReply = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    const { post_id, comment_id, content } = req.body;

    //데이터 생성(_id 자동 생성)
    const newReply = new Comments({
      post_id,
      comment_id,
      user: req.user._id,
      content,
    });
    // _id: "1"
    // post_id: "2"
    // comment_id: "3"
    // user: {_id: '4', nickname: 'a', avatar: 'url'}
    // content: "-"
    // createdAt: "-"
    // updatedAt: "-"
    // __v: 0
    // replies: []

    //데이터 추가(변형)
    await Comments.findOneAndUpdate({ _id: comment_id }, { $push: { replies: newReply._id } });

    //db에 저장(변경된 데이터 저장)
    await newReply.save();

    res.status(200).json({ msg: "Created successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default createReply;
