import express from "express";
import authCtrl from "@controllers/authCtrl";
import valid from "@middleware/valid";

const authRouter = express.Router();
const { register, login, logout, refresh } = authCtrl;

// get: 데이터 조회, no need data
// post: 데이터 등록
// put: 데이터 변경(모두)
// patch: 데이터 변경(부분)
// delete: 데이터 제거
authRouter.post("/register", valid, register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/refresh", refresh);

export default authRouter;
