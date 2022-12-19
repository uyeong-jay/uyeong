import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Blogs from "@models/blogModel";

export const createCategory = async (req: IReqAuth, res: Response) => {
  try {
    console.log(req.body);
    res.status(200).json({ msg: "Create Success!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};
