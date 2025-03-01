import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Categories from "@models/blog/categoryModel";

const createCategory = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });
    //admin인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { name } = req.body;

    //category 조회
    //catrgory model > required, unique, maxLength

    //데이터 생성
    const newCategory = new Categories({ name });

    //db에 저장
    await newCategory.save();

    res.status(200).json({ msg: "Created successfully!" });
  } catch (err: any) {
    let errMsg;

    if (err.code === 11000) {
      // console.log(err);
      // {
      //	index: 0,
      // 	code: 11000,
      // 	keyPattern: { name: 1 },
      // 	keyValue: { name: 'javascript' },
      // 	[Symbol(errorLabels)]: Set(0) {}
      // }
      // console.log(Object.keys(err.keyValue)); //[ 'name' ]

      // errMsg = err.keyValue.name + " already exists.";
      // errMsg = Object.keys(err.keyValue)[0] + " already exists."; //'name already exists'.
      errMsg = ` Category "${Object.values(err.keyValue)[0]}" already exists.`;
    } else {
      let name = Object.keys(err.errors)[0];
      errMsg = err.errors[`${name}`].message;
    }

    return res.status(500).json({ msg: errMsg });
  }
};

export default createCategory;
