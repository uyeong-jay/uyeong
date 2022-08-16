import express from "express";
import authCtrl from "@controllers/authCtrl";
import { valid } from "@middleware/vaild";

const authRouter = express.Router();

authRouter.post("/register", valid, authCtrl.register);

export default authRouter;
