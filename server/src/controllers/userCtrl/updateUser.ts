import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Users from "@models/userModel";
import bcrypt from "bcrypt";

const updateUser = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //client 데이터 가져오기
    const { /* _id */ /* email */ avatar, nickname, old_password, new_password } = req.body;

    //nickname 중복 조회
    const userByNickname = await Users.findOne({ nickname: new RegExp(`^${nickname}$`, "i") }); //대소문자 구분x
    if (userByNickname && userByNickname._id.toString() !== req.user._id.toString())
      return res.status(400).json({ msg: "Your nickname already exists." });

    //유저 조회 by id //비번번경 유저 확인시 사용
    const userById = await Users.findOne({ _id: req.user._id });
    if (!userById) return res.status(400).json({ msg: "Your account doesn't exist." });

    //password 바꾸지 않음
    if (!new_password) {
      //업데이트 하기
      await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname });
    }

    //password 바꿈
    if (new_password) {
      //password 조회(bcrypt)
      const isMatch = await bcrypt.compare(old_password, userById.password);
      if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect." });

      //password 암호화
      const salt = await bcrypt.genSalt(5); //솔트 추가
      const newPasswordHash = await bcrypt.hash(new_password, salt); //비번 해싱

      //업데이트 하기
      await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, nickname, password: newPasswordHash });
    }

    //성공
    res.status(200).json({ msg: "Update successfully completed!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updateUser;
