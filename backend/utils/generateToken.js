import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

export default generateToken;
