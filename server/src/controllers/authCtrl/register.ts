import { Request, Response } from "express"; //types
import userModel from "@models/userModel";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
	try {
		//client에서 body 가져오기
		//아직 body를 만들기 전일경우 postman 사용해서 직접 만들어 넘겨도됨
		const { name, email, password, cf_password } = req.body;

		//email 탐색
		const userEmail = await userModel.findOne({ email }); // { email: email }
		//(findOne: 데이터들 중 가장 첫번째 데이터 하나만 탐색)

		//email이 이미 존재할때
		if (userEmail) {
			return res.status(400).json({ msg: "이 이메일은 이미 존재합니다.\n(This email already exist.)" });
		}

		//사용가능한 email 일때
		//비번 암호화 하기
		//- 단방향 해싱(여기선 bcrypt사용)
		//- 보안 더 강화 하고싶을때 해보기
		//	- https://st-lab.tistory.com/100 (보안): 비번(+솔트)  > 해시 > 다이제스트(+솔트) > 해시 > 다이제스트
		const salt = await bcrypt.genSalt(5); //솔트추가
		const passwordHash = await bcrypt.hash(password, salt); //비번해싱(with bcrypt)

		//가입한 새유저 비번 암화된 데이터
		const newUser = new userModel({
			name,
			email,
			password: passwordHash,
			cf_password: passwordHash,
		});

		//db에 저장(위 형식으로 저장)
		await newUser.save();

		res.json({ msg: "Register Success!" });
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
