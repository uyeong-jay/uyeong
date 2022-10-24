import express from "express";
import authCtrl from "@controllers/authCtrl";
import { valid } from "@middleware/vaild";

const authRouter = express.Router();

// get: 데이터 조회, no need data
// post: 데이터 등록
// put: 데이터 변경(모두)
// patch: 데이터 변경(부분)
// delete: 데이터 제거
authRouter.post("/register", valid, authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.post("/logout", authCtrl.logout);
authRouter.get("/refresh", authCtrl.refresh);

export default authRouter;
