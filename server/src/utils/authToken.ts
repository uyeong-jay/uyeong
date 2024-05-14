import jwt from "jsonwebtoken";
import { IDecodedToken } from "@_types/types";

export const authToken = (token: string, tokenSecret: string) => {
  try {
    const decoded = <IDecodedToken>jwt.verify(token, tokenSecret);
    // console.log(decoded);
    // { id: '62-----------------4f', iat: 1667445445, exp: 1667446345 }
    return {
      decoded,
    };
  } catch {
    return {
      decoded: {
        id: "",
      },
    };
  }
};
