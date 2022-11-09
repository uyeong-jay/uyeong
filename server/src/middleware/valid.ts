import { Request, Response, NextFunction } from "express";

//이메일 유효성 검사
//https://stackoverflow.com/questions/46155
export const validateEmail = (email: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(String(email).toLocaleLowerCase()); //true or false
};

//valid 미들웨어
const valid = (req: Request, res: Response, next: NextFunction) => {
	const { nickname, email, password, cf_password } = req.body;

	//error들 모아 놓기
	const errors = [];

	//nickname 에러
	if (!nickname) errors.push("Please add your nickname.");
	else if (nickname.length < 2 || nickname.length > 10)
		errors.push("Your nickname must be between 2 and 10 characters.");

	//email 에러
	if (!email) errors.push("Please add your email.");
	else if (!validateEmail(email)) errors.push("Please enter your email correctly.");

	//password 에러
	if (!password) errors.push("Please add your password.");
	else if (password.length < 6) errors.push("Your password must be 6 chars or more.");

	//cf_password 에러
	if (!cf_password) errors.push("Please add your confirm password.");
	else if (cf_password.length < 6) errors.push("Your confirm password also must be 6 chars or more.");
	else if (password !== cf_password) errors.push("Your password and confirm password should be same.");

	//가장 첫번째 에러 내보내기
	//res는 동시에 여러개가 내보내지지 않도록 마지막 한번만 내보내주도록 해주는게 좋음
	if (errors.length > 0) return res.status(400).json({ msg: errors[0] });

	return next();
};

export default valid;

//사용: authRouter.post("/register", valid, authCtrl.register);
