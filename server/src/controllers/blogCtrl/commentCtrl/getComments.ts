import { Request, Response } from "express";
import Comments from "@models/blog/commentModel";

const getComments = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = Number(page);
    const { slug: postTitle } = req.params;
    const limit = 10;
    const commentCountToShow = limit * pageNum;

    if (pageNum <= 0) {
      const totalCommentCount = await Comments.countDocuments({ post_title: postTitle });
      return res.status(200).json({ comments: [], totalCommentCount });
    }

    const data = await Comments.aggregate([
      {
        $facet: {
          //comment + user
          totalData: [
            {
              $match: {
                post_title: postTitle,
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
            {
              $lookup: {
                from: "comments",
                let: { cm_id: "$replies" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
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
                ],
                as: "replies",
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: postTitle ? commentCountToShow : 0 },
          ],
          totalCount: [
            {
              $match: {
                post_title: postTitle,
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

    // console.log(data); //[ { totalData: [ [Object], [Object] ], count: 2 } ]
    const comments = data[0].totalData;
    const totalCommentCount = data[0].count;

    if (!comments.length) return res.status(200).json({ msg: "No Posts" });

    res.status(200).json({ comments, totalCommentCount, commentCountToShow });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getComments;
