import { Request, Response } from "express"; //types
import Users from "@models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { /* generateAccessToken */ generateRefreshToken } from "@utils/generateToken";
import { generateRandomNumber, sendEmail } from "@utils/authEmail";

const register = async (req: Request, res: Response) => {
  try {
    //valid 미들웨어 통과 후
    //client 데이터 가져오기
    const { nickname, email, emailCode, password } = req.body;

    console.log("email: ", email, "emailCode: ", emailCode);

    //nickname 조회
    const userNickname = await Users.findOne({ nickname });
    if (userNickname) {
      return res.status(400).json({ msg: "This nickname already exists." });
    }

    //email 조회
    const userEmail = await Users.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ msg: "This email already exists." });
    }

    if (!emailCode) {
      const verificationCode = generateRandomNumber();

      //인증 코드 전송
      const messageId = sendEmail(email, verificationCode);
      // 이메일 보내기 실패시
      if (!messageId) {
        return res.status(400).json({ msg: "Failed to send email. Please try again." });
      }

      res.status(200).json({ verifiedEmail: email, verificationCode, msg: "Email sent!" });
    } else {
      //password 암호화 하기
      const salt = await bcrypt.genSalt(5); //솔트 추가
      const passwordHash = await bcrypt.hash(password, salt); //비번 해싱

      //(가입한 새유저 비번 암화된) 데이터 생성
      const newUser = new Users({
        nickname,
        email,
        password: passwordHash,
      });

      const refresh_token = generateRefreshToken({ id: newUser._id }, res);

      newUser.rf_token = refresh_token;

      //db에 저장
      await newUser.save();

      res.status(200).json({ refresh_token, msg: "Joined successfully!" });
    }
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default register;
