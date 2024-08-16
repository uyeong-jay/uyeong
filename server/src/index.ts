import express from "express";
import hpp from "hpp";
import cors from "cors"; // Connect/Express middleware 제공
import helmet from "helmet";
import morgan from "morgan"; // 로그관리
import cookieParser from "cookie-parser"; // 쿠키 헤더 분석 후 req.cookies에 넣음

// dotenv
import dotenv from "dotenv"; // 환경변수 관리
dotenv.config(); //mongodb가 connect 되기 전의 자리에 위치

import "@config/connect";
import routes from "@routes/index";

const app = express();

// Middelware
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // 상세 로그 기록
  app.use(hpp()); // HTTP 파라미터 오염 방지 활성화
  app.use(helmet({ contentSecurityPolicy: false })); // 콘텐츠 보안 정책 설정 비활성화 (필요시 설정)
  app.use(
    cors({
      origin: "url", // 프론트엔드 도메인 설정
      credentials: true, // 백,프 간 쿠키 공유
    })
  );
} else {
  // app.use(cors());
  app.use(
    cors({
      origin: true,
      credentials: true, //백,프 간 쿠키 공유
    })
  );
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api", routes.authRouter);
app.use("/api", routes.userRouter);
app.use("/api", routes.blogCategoryRouter);
app.use("/api", routes.blogPostRouter);
app.use("/api", routes.blogCommentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
