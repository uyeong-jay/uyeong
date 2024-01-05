import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    // if (!req.params.slug) return res.status(200).json({ msg: "No query" });
    // console.log(req.query.q);

    //pagination (infinite scroll)
    const { page: nextId } = req.query;
    const { slug: categoryTitle } = req.params;

    const limit = 6;
    const sort = "-_id";

    const postsByCategory = await Posts.find({
      $and: [
        {
          _id: nextId ? { $lt: nextId } : { $exists: true },
        },
        {
          $or: [{ category: { $eq: categoryTitle } }], //$eq: 정확히 일치 할때만
        },
      ],
    })
      .limit(limit)
      .sort(sort);

    const next_cursor = postsByCategory[limit - 1]?._id.toString() || undefined;
    console.log(next_cursor);

    if (!postsByCategory.length) return res.status(200).json({ hasMatchingPost: false, msg: "No posts" });

    res.status(200).json({ postsByCategory, next_cursor, hasMatchingPost: true });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default getPostsByCategory;

//client 가 받을 데이터
// {
//   "postsByCategory": [
//       {
//           "_id": "",
//           "title": "Web1",
//           "tags": [
//               "web"
//           ],
//           "content": "# web1",
//           "description": "web1",
//           "thumbnail": "",
//           "privacy": true,
//           "category": "web",
//           "createdAt": "",
//           "updatedAt": "",
//           "__v": 0,
//       },
//       {
//           "_id": "",
//           "title": "Web2",
//           "tags": [
//               "web"
//           ],
//           "content": "# web2",
//           "description": "web2",
//           "thumbnail": "",
//           "privacy": true,
//           "category": "web",
//           "createdAt": "",
//           "updatedAt": "",
//           "__v": 0,
//       }
//   ]
// }
