import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Posts from "@models/blog/postModel";
import { makeUrlFriendly } from "@utils/urlFriendly";

const createPost = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { title, tags, content, thumbnail, description, category, privacy } = req.body;
    const { titleCheck } = req.query;

    // 기존 title이 있는지 검사 (대소문자 구분 없이 검사)
    const existingPost = await Posts.findOne({ title: { $regex: new RegExp(`^${title}$`, "i") } });

    if (existingPost) return res.status(400).json({ msg: "The post already exists." });

    // 제목 중복 검사를 위한 요청이면 성공 응답 반환 후 종료
    if (titleCheck === "true") return res.status(200).json({ msg: "You can use this title." });

    //post 조회
    //post model > title > required, unique, maxLength

    //데이터 생성
    const newPost = new Posts({
      titleForUrl: makeUrlFriendly(title),
      title,
      tags,
      content,
      thumbnail,
      description,
      privacy,
      category,
    });

    //db에 저장
    await newPost.save();

    res.status(200).json({ msg: "Created successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default createPost;
