import { IReqAuth } from "@_types/types";
import { Response } from "express";
// import Comments from "@models/blog/commentModel";

const updateReply = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기

    //reply 조회

    //reply 조회 후 업데이트

    res.status(200).json({ msg: "Update Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updateReply;
