import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Categories from "@models/blog/categoryModel";
import Posts from "@models/blog/postModel";

const deleteCategory = async (req: IReqAuth, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //category 조회 후 삭제
    await Categories.findOneAndDelete({ name: req.body.name });
    //name: req.params.id
    //name: req.params.slug

    //post 조회 후 업데이트
    await Posts.updateMany({ category: req.body.name }, { $set: { category: "" } });

    res.status(200).json({ msg: "Delete Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default deleteCategory;
