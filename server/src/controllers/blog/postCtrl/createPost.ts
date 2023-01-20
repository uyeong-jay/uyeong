import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Posts from "@models/blog/postModel";

const createPost = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { title, tags, content, thumbnail, description, category, privacy, createdAt } = req.body;

    //데이터 생성
    const newPost = new Posts({
      titleForUrl: title.replace(/\s+/g, "-"),
      title,
      tags,
      content,
      thumbnail,
      description,
      privacy,
      category,
      createdAt,
    });

    //db에 저장
    await newPost.save();

    res.status(200).json({ msg: "Create Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default createPost;
