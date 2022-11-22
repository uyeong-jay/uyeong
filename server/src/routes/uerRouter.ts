import express from "express";
import userCtrl from "@controllers/userCtrl";
import auth from "@middleware/auth";

const userRouter = express.Router();
const { updateUser } = userCtrl;

// get(read): 데이터 조회, no need data
// post(create): 데이터 등록
// put(update): 데이터 변경(모두)
// patch(update): 데이터 변경(부분)
// delete(delete): 데이터 제거
userRouter.patch("/user", auth, updateUser);

export default userRouter;
