import { Request, Response } from "express";
import Posts from "@models/blog/postModel";

const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    //middleware auth 잘통과 했는지 확인
    // if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin 인지 확인
    // if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //post 데이터 가져오기
    const posts = await Posts.find().sort("-createAt");

    //post 선별 하기 (by Category)
    const postsByCategory = posts.filter((post: { category: string }) => post.category === req.params.slug);

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
