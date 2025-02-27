import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getTags = async (req: Request, res: Response) => {
  try {
    // 태그별 사용 횟수 계산
    const tags = await Posts.aggregate([
      { $unwind: "$tags" }, // tags 배열을 개별 태그로 분리
      {
        $group: {
          _id: "$tags", // 태그별 그룹화
          count: { $sum: 1 }, // 등장 횟수 누적
        },
      },
      { $sort: { count: -1 } }, // 등장 횟수가 많은 순으로 정렬
      { $limit: 50 }, // 최대 50개 태그만 가져오기
      {
        $project: {
          _id: 0,
          name: "$_id", // 태그 이름을 name으로 변경
          count: 1, // count 유지
        },
      },
    ]);

    res.status(200).json({ tags });
    // [{ name: "태그명", count: 태그사용횟수 }, ...]
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getTags;
