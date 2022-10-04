import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "@models/userModel";
import { IDecodedToken } from "@_types/types";
import { generateAccessToken, generateRefreshToken } from "@utils/generateToken";

//새로고침 되었을때 유저 확인 + 토큰 새로 발급해주기
export const refresh = async (req: Request, res: Response) => {
	try {
		//token refresh 하기전 token이 있는지 확인 하기
		//refresh_token 쿠키(유저id) 가져오기
		const rf_token = req.cookies.refresh_token;
		console.log("쿠키:", req.cookies.refresh_token);
		if (!rf_token) return res.status(400).json({ msg: "Please login first." }); //refresh_token 쿠키(유저id 쿠키)가 없다는건 아직 로그인을 하지 않았다는 뜻

		//token이 있으면 디코드 시켜서 해당 유저id 가져오기
		//refresh_token 쿠키(유저id) 디코드 하기(jwt)
		const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
		if (!decoded) res.status(400).json({ msg: "Please login first." });
		//refresh_token 쿠키(유저id 쿠키)가 없다는건 아직 로그인을 하지 않았다는 뜻
		// console.log(decoded);
		// { id: '628c484bd2b44d75c5515c18', iat: 1653360788, exp: 1655952788 }

		//디코드된 id의 유저 데이터 가져오기 (토큰 새로 넣어줄려고)
		const user = await Users.findById(decoded.id).select("-password -cf_password"); //비번빼고 가져오기
		if (!user) res.status(400).json({ msg: "This account doesn't exist." }); //유저 자체가 없다는 건 없는 계정이라는 뜻
		// console.log(user);
		// {
		//   _id: new ObjectId("628c484bd2b44d75c5515c18"),
		//   name: 'test1',
		//   email: 'test1@naver.com',
		//   avatar: 'https://res.cloudinary.com/uyeong/image/upload/v1637676343/nextjs_media/igin1evr3clomdfy2ikm.png',
		//   role: 'user',
		//   type: 'register',
		//   createdAt: 2022-08-18T02:51:55.843Z,
		//   updatedAt: 2022-08-18T02:51:55.843Z,
		//   __v: 0
		// }

		//(access, refresh)토큰 새로 발급하기
		const access_token = generateAccessToken({ id: user?._id });
		const refresh_token = generateRefreshToken({ id: user?._id });

		//해당id 유저에 새로만든 refresh_token 추가해주기
		await Users.findOneAndUpdate({ _id: user?._id }, { refresh_token });

		//성공시
		res.status(200).json({
			access_token,
			refresh_token,
			user,
		});
	} catch (err) {
		if (err instanceof Error) return res.status(500).json({ msg: err.message });
	}
};
