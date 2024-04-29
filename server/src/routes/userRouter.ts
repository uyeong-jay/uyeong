import express from "express";
import userCtrl from "@controllers/userCtrl";
import auth from "@middleware/auth";

const userRouter = express.Router();
const { updateUser } = userCtrl;

userRouter.patch("/user", auth, updateUser);

export default userRouter;
