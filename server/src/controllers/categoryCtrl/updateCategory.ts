import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Categories from "@models/categoryModel";

export const updateCategory = async (req: IReqAuth, res: Response) => {
	try {
		//middleware auth 잘통과 했는지 확인
		if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

		//admin인지 확인
		if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

		//client 데이터 가져오기
		const { name, currName } = req.body;

		//category 조회 후 업데이트
		await Categories.findOneAndUpdate({ name }, { name: currName.toLowerCase() });
		//name: req.params.id
		//name: req.params.slug
		//name: req.body.name

		res.status(200).json({ msg: "Update Success!" });
	} catch (err: any) {
		return res.status(500).json({ msg: err.message });
	}
};
