const { APIError } = require("../utils/err");
const { verify, JsonWebTokenError } = require("jsonwebtoken");

exports.userRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(APIError.unauthenticated());
    }
    const token = authorization.split(" ")[1];
    const payload = await verify(token, process.env.JWT_SECRET_TOKEN);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (error) {
    let err = error;
    if (error instanceof JsonWebTokenError) {
      err = APIError.badRequest("Invalid or Expired Token Supplied");
    }
    next(err);
  }
};
exports.buyerRequired = async (req, res, next) => {
  try {
    const isBuyer = req.userRole === "buyer";
    if (!isBuyer) {
      return next(
        APIError.unauthorized(`Unauthorized! Only buyers are allowed to access this endpoint, you're a ${req.userRole}`)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
exports.sellerRequired = async (req, res, next) => {
  try {
    const isSeller = req.userRole === "seller";
    if (!isSeller) {
      return next(APIError.unauthorized(`Unauthorized! Only sellers are allowed to access this endpoint, you're a ${req.userRole}`));
    }
    next();
  } catch (error) {
    next(error);
  }
};
