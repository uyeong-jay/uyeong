import { Request, Response } from "express";
import Categories from "@models/blog/categoryModel";

const getCategories = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const pageNum = Number(page);
    const limit = 4;
    const skip = (pageNum - 1) * limit;

    // 카테고리별 게시글 개수를 포함하여 가져오기
    let categories = await Categories.aggregate([
      {
        $lookup: {
          from: "posts", // 블로그 포스트 컬렉션
          localField: "name", // 카테고리 이름과 일치하는 필드
          foreignField: "category", // 포스트에서 카테고리를 가리키는 필드
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" }, // 연결된 posts 배열의 길이를 postCount로 저장
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          updatedAt: 1,
          postCount: 1, // 포스트 개수 포함
          posts: {
            _id: 1,
            thumbnail: 1,
          }, // 필요한 포스트 필드만 선택 가능
          // posts: 0, // posts 배열을 가져오는게 불필요하면 사용(기존 카테고리 데이터는 모두 가져옴)
        },
      },
      { $sort: { _id: -1 } }, // 최신순 정렬
      { $skip: pageNum ? skip : 0 },
      { $limit: pageNum ? limit : Number.MAX_SAFE_INTEGER },
    ]);

    // pagination
    // 전체 카테고리 개수 (페이지네이션을 위한 계산)
    const total = await Categories.countDocuments({});
    const totalPages = Math.ceil(total / limit);

    if (!categories.length) return res.status(400).json({ msg: "No categories" });

    res.status(200).json({ categories, totalPages });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getCategories;
