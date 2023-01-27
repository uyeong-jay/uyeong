import { Request, Response } from "express";
import Comments from "@models/blog/commentModel";

const getComments = async (req: Request, res: Response) => {
  try {
    //comment를 가장 최근에 생성된것이 가장 첫번째에 오도록 가져오기
    console.log(req.params.slug);
    const data = await Comments.aggregate([
      {
        $facet: {
          totalData: [
            //comment + user
            {
              $match: {
                post_title: req.params.slug,
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  { $project: { nickname: 1, avatar: 1 } },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            { $sort: { createdAt: -1 } },
          ],
          totalCount: [
            {
              $match: {
                post_title: req.params.slug,
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1,
        },
      },
    ]);

    const comments = data[0].totalData;
    const count = data[0].count;

    res.status(200).json({ comments, count });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getComments;

//client 가 받을 데이터
