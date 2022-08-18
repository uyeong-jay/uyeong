import express from "express";
import authCtrl from "@controllers/authCtrl";
import { valid } from "@middleware/vaild";

const authRouter = express.Router();

// get: 데이터 조회
// post: 데이터 등록
// put: 데이터 변경
// delete: 데이터 제거
authRouter.post("/register", valid, authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.get("/logout", authCtrl.logout);
authRouter.get("/refresh", authCtrl.refresh);

export default authRouter;
