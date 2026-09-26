/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return { success: true, data: verifiedToken };
  } catch (error: any) {
    // console.log("Token verificatin failed", error);
    return { success: false, error: error.message };
  }
};

export const jwtUtils = { verifyToken };
