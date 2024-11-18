import express from "express";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan"; // 로그관리
import cookieParser from "cookie-parser"; // 쿠키 헤더 분석 후 req.cookies로 받아옴

import dotenv from "dotenv";
dotenv.config(); // mongodb가 connect 되기 전의 자리에 위치

import "@config/connect";
import routes from "@routes/index";

const app = express();
const prod = process.env.NODE_ENV === "production";

// Middleware
if (prod) {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: "http://uyeong.com", // 프론트엔드 도메인
      credentials: true, // 백,프 간 쿠키 공유
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true, // 백,프 간 쿠키 공유
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api", [
  routes.authRouter,
  routes.userRouter,
  routes.blogCategoryRouter,
  routes.blogPostRouter,
  routes.blogCommentRouter,
]);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
