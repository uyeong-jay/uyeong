import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Comments from "@models/blog/commentModel";

const deleteComment = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { comment_id } = req.body;

    // comment는 Role에 관계없이 삭제(admin 체크 안함)
    // (client 에서 삭제 버튼이 보이면 삭제 가능)
    let query: { _id: string; user?: object } = { _id: req.params.id };

    // 만약의 상황에서 사용자가 Admin이 아닌 경우,
    // user 필드를 추가해 해당 user 가 아니면 지울수 없게 만들기
    if (req.user.role !== "admin") {
      query.user = req.user._id;
    }

    // 댓글 조회 후 삭제
    const comment = await Comments.findOneAndDelete(query);

    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exist." });
    }

    if (comment_id) {
      //update rplies
      await Comments.findOneAndUpdate(
        { _id: comment_id },
        //데이터 가져오기(comment)
        { $pull: { replies: comment._id } }
      );
    } else {
      //delete rplies
      await Comments.deleteMany(
        //데이터 가져오기(comment)
        //데이터의 comment에서 replies배열 안에있는 id들과 일치하는 모든 데이터 삭제
        { _id: { $in: comment.replies } }
      );
    }

    res.status(200).json({ msg: "Delete Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default deleteComment;
