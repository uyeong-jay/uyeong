import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const updateComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { content } = req.body;

    const comment = await Comments.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { content });
    if (!comment) return res.status(400).json({ msg: "Comment doesn't exits." });

    //comment 조회
    // _id 63f5c1d28ca3af30e73bfe01
    // post_id "63d2401bcb578336cb48939c"
    // user 63ca2d35d9706091cce1f62c
    // content "@tes"
    // replies Array
    // comment_id 63f5c1bc8ca3af30e73bfdee
    // createdAt 2023-02-22T07:18:42.580+00:00
    // updatedAt 2023-02-22T07:18:42.580+00:00
    // const comment = await Comments.findOneAndUpdate({
    //   _id:
    // })

    //comment 조회 후 업데이트

    res.status(200).json({ msg: "Update Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updateComment;
