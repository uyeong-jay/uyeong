import express from "express";
import cors from "cors"; // Connect/Express middleware 제공
import morgan from "morgan"; // 로그관리
import cookieParser from "cookie-parser"; // 쿠키 헤더 분석 후 req.cookies에 넣어줌
import dotenv from "dotenv"; // 환경변수 관리
dotenv.config(); //mongodb가 connect 되기 전의 자리에 위치해야함

import "@config/connect";
import routes from "@routes/index";

// dotenv

// Middelware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
// app.get("/", (req, res) => {
// 	res.json({ msg: "Hello World" });
// });
app.use("/api", routes.authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
