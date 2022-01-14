import { NextFunction } from "express";
import jwt from "jsonwebtoken";

function auth(req: any, res: any, next: NextFunction) {
  const token = req.cookies.token;
  console.log(token);

  if (token == undefined) {
    console.log("here");
    return res.json({ success: false, message: "Token not provided" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY!);
    req.user = decoded;
    next();
  } catch (e) {
    res.send({ success: false, message: "Invalid Token" });
  }
}

export default auth;
