import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const deleteComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { comment_id } = req.body;

    //comment 조회 후 삭제
    const comment = await Comments.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!comment) return res.status(400).json({ msg: "Comment does not exits." });

    if (comment_id) {
      //update rplies
      await Comments.findOneAndUpdate(
        { _id: comment_id },
        //삭제 데이터 정보에서 가져오기(comment)
        { $pull: { replies: comment._id } }
      );
    } else {
      //delete rplies
      await Comments.deleteMany(
        //삭제 데이터 정보에서 가져오기(comment)
        //삭제 데이터의 comment에서 replies배열 안에있는 id들과 일치하는 모든 데이터 삭제
        { _id: { $in: comment.replies } }
      );
    }

    res.status(200).json({ msg: "Delete Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default deleteComment;
