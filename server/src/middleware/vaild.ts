import { Request, Response, NextFunction } from "express";

//이메일 유효성 검사
//https://stackoverflow.com/questions/46155
export const validateEmail = (email: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(String(email).toLocaleLowerCase()); //true or false
};

//valid 미들웨어
export const valid = (req: Request, res: Response, next: NextFunction) => {
	const { nickname, email, password, cf_password } = req.body;

	//error들 모아 놓기
	const errors = [];

	if (!nickname) errors.push("닉네임 칸을 채워주세요(Please add your name.)");
	else if (nickname.length > 20)
		errors.push("닉네임은 적어도 20자 이하여야 합니다.(Your nickname must be 20 chars or less.)");

	if (!email) errors.push("이메일 칸을 채워주세요.\n(Please add your email.)");
	else if (!validateEmail(email)) errors.push("이메일을 정확히 입력해주세요.\n(Please enter your email correctly.)");

	if (!password) errors.push("비밀번호 칸을 채워주세요.\n(Please add your password.)");
	else if (password.length < 6)
		errors.push("비밀번호는 적어도 6자 이상이여야 합니다.\n(Your password must be 6 chars or more.)");

	if (!cf_password) errors.push("비밀번호 확인칸을 채워주세요.\n(Please add your confirm password.)");
	else if (password.length < 6)
		errors.push(
			"확인 비밀번호 또한 적어도 6자 이상이여야 합니다.\n(Your confirm password also must be 6 chars or more.)"
		);
	else if (password !== cf_password)
		errors.push("비밀번호가 똑같이 쓰여지지 않았습니다.\n(Your password and confirm password should be same.)");

	if (errors.length > 0) return res.status(400).json({ msg: errors });

	return next();
};

//사용법: authRouter.post("/register", valid, authCtrl.register);
