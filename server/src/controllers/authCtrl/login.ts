import { Request, Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@utils/generateToken";

export const login = async (req: Request, res: Response) => {
	try {
		//client에서 데이터 받기
		const { email, password } = req.body;

		//user email 찾아서 user 데이터 가져오기
		const user = await Users.findOne({ email });

		//못찾으면 에러
		if (!user) return res.status(400).json({ msg: "This account doesn't exist." });

		//user email 이 있을경우
		//비밀번호 일치 확인(bcrypt)
		const isMatch = await bcrypt.compare(password, user.password);

		//일치 하지 않으면 에러
		if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

		//비밀번호까지 일치한다면
		//(access, refresh)토큰 만들기
		const access_token = generateAccessToken({ id: user._id });
		const refresh_token = generateRefreshToken({ id: user._id });

		//해당id 유저에 새로만든 refresh_token 추가해주기
		//findOneAndUpdate(조건, 변경, 옵션, 콜백)??
		await Users.findOneAndUpdate({ _id: user._id }, { refresh_token });

		// refresh token 쿠키 생성하기
		res.cookie("refresh_token", refresh_token, {
			path: "/",
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000, // day*hour*min*sec*ms //30days
		});

		//성공시
		res.status(200).json({
			msg: "Login Success!",
			access_token,
			refresh_token,
			user: { ...user._doc, password: "", cf_password: "" }, //비번빼고 가져오는 방법
		});
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
