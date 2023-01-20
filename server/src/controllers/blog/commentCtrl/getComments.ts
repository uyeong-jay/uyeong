import { Request, Response } from "express";
// import Comments from "@models/blog/commentModel";

const getComments = async (req: Request, res: Response) => {
  try {
    //comment를 가장 최근에 생성된것이 가장 첫번째에 오도록 가져오기

    res.status(200).json({});
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getComments;

//client 가 받을 데이터
