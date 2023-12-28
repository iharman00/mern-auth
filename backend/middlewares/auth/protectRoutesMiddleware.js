import verifyToken from "../../utils/auth/verifyToken.js";

const protect = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      try {
        const decoded = await verifyToken(token);
        req.user = { _id: decoded.sub };
      } catch (error) {
        throw new Error("Not Authorized, invalid token ");
        res.status(401);
      }
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  } catch (error) {
    next(error);
  }
};

export default protect;
