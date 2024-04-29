import { Request, Response, NextFunction } from "express";

//이메일 유효성 검사
export const validEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLocaleLowerCase()); //true or false
};

//valid 미들웨어
const valid = (req: Request, res: Response, next: NextFunction) => {
  const { nickname, email, emailCode, password, cf_password } = req.body;

  //error들 모음
  const errors = [];

  //email 에러
  if (!email) errors.push("Please enter your email.");
  else if (!validEmail(email)) errors.push("Please enter your email in the correct format.");

  if (emailCode) {
    //nickname 에러
    if (!nickname) errors.push("Please enter your nickname.");
    else if (nickname.length < 2 || nickname.length > 20)
      errors.push("Your nickname must be between 2 and 20 characters long.");

    //password 에러
    if (!password) errors.push("Please enter your password.");
    else if (password.length < 6) errors.push("Your password must be 6 characters or more.");

    //cf_password 에러
    if (!cf_password) errors.push("Please enter your confirm password.");
    else if (password !== cf_password) errors.push("Your password and confirm password should be same.");
  }

  //첫번째 에러 내보내기
  if (errors.length > 0) return res.status(400).json({ msg: errors[0] });

  return next();
};

export default valid;

//사용: authRouter.post("/register", valid, authCtrl.register);
