import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    // if (!req.params.slug) return res.status(200).json({ msg: "No query" });
    // console.log(req.query.q);

    const postsByCategory = await Posts.find({
      $or: [{ category: { $eq: req.params.slug } }], //$eq: 정확히 일치 할때만
    }).sort({ createdAt: -1 });

    if (!postsByCategory.length) return res.status(400).json({ msg: "No blogs" });

    res.status(200).json({ postsByCategory });
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
