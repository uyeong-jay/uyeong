import express from "express";
import userCtrl from "@controllers/userCtrl";
import valid from "@middleware/valid";
import auth from "@middleware/auth";

const userRouter = express.Router();
const { update } = userCtrl;

// get: 데이터 조회, no need data
// post: 데이터 등록
// put: 데이터 변경(모두)
// patch: 데이터 변경(부분)
// delete: 데이터 제거
userRouter.patch("/user", auth, update);

export default userRouter;
