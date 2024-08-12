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

    if (!title) return res.status(400).json({ msg: "Please enter the title." });
    if (title.length > 100) return res.status(400).json({ msg: "The title must be 100 characters or less." });

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
    );

    if (!post) return res.status(400).json({ msg: "Invalid Authentication." });

    res.status(200).json({ msg: "Updated successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updatePost;
