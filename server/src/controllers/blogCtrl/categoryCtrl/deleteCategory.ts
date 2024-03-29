import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Categories from "@models/blog/categoryModel";
import Posts from "@models/blog/postModel";

const deleteCategory = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //category 조회 후 삭제
    const category = await Categories.findOneAndDelete({ name: req.body.name });
    if (!category) return res.status(400).json({ msg: "The category doesn't exist." });

    //post 조회 후 업데이트
    await Posts.updateMany({ category: req.body.name }, { $set: { category: "" } });

    res.status(200).json({ msg: "Deleted successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default deleteCategory;
