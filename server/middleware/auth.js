import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  // get a token, verfiy it and attach decoded payload to req

  const token = req.cookies.token;

  if (!token) {
    // console.log("No token");
    return res.status(401).json({
      message: "Unauthorized user",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};
