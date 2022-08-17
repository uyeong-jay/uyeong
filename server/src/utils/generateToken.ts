//https://velopert.com/2389
//https://github.com/auth0/node-jsonwebtoken#readme
//https://cotak.tistory.com/102

//1. 회원 인증:
// 1) 유저가 로그인 > 서버는 유저의 정보에 기반한 토큰을 발급 > 유저에게 전달
// 2) 유저가 서버에 요청 > 서버는 JWT를 포함하여 유저에게 전달

// => client로 부터 server 가 요청을 받을때 마다, 서버는 해당 유저의 토큰이 유효한지, 인증이 되었는지, 권한이 있는지 확인 후 작업을 처리

// => 서버측에서는 유저의 세션을 유지 할 필요가 없다.
// 즉, 유저가 로그인되어있는지 안되어있는지 신경 쓸 필요가 없고, 유저가 요청을 했을때 토큰만 확인하면 되니,
// 세션 관리가 필요 없어서 서버 자원을 많이 아낄 수 있다.

//2. 정보 교류: JWT는 두 개체 사이에서 안정성있게 정보를 교환하기에 좋은 방법이다.
// => 정보가 sign 이 되어있어
//정보를 보낸이가 바뀌진 않았는지,
//정보가 도중에 조작되지는 않았는지 검증할 수 있다.
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
	//토큰 생성
	//- jwt.sign(userInfo, secretKey, options, 익명함수)
	//  - secretKey는 password generator 이용하기
	return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
		expiresIn: "30d",
	});
};

//사용: const refresh_token = generateAccessToken({ id: user._id });
