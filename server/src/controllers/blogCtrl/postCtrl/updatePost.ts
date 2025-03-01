import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Posts from "@models/blog/postModel";
import { makeUrlFriendly } from "@utils/urlFriendly";

const updatePost = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { _id: postId, title, tags, content, thumbnail, description, category, privacy } = req.body;
    const { titleCheck } = req.query;

    // 제목 중복 검사 (대소문자 구분없이 검사) (`id`가 존재하면 현재 수정 중인 포스트를 제외하고 검사)
    const existingPost = await Posts.findOne(
      postId
        ? { title: { $regex: new RegExp(`^${title}$`, "i") }, _id: { $ne: postId } }
        : { title: { $regex: new RegExp(`^${title}$`, "i") } }
    );

    if (existingPost) return res.status(400).json({ msg: "The post already exists." });

    // titleCheck: 'true' or 'undefined'
    if (titleCheck === "true") return res.status(200).json({ msg: "You can use this title." });

    //post 조회 후 업데이트
    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      {
        titleForUrl: makeUrlFriendly(title),
        title,
        tags,
        content,
        thumbnail,
        description,
        category,
        privacy,
      }
      // { new: true } //업데이트된 데이터 반환
    );

    if (!post) return res.status(400).json({ msg: "Failed to update the post." });

    res.status(200).json({ msg: "Updated successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updatePost;
