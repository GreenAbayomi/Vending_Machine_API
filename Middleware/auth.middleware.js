const { APIError } = require("../utils/err");
const { verify, JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const {allRoles} = require('../Models/users.model')

exports.userRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(APIError.unauthenticated());
    }
    const token = authorization.split(' ')[1];
    const payload = await verify(token, process.env.JWT_SECRET_TOKEN);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (error) {
    let err = error;
    if (error instanceof TokenExpiredError) {
     err = APIError.badRequest("Expired Token Supplied")
   }
   else if (error instanceof JsonWebTokenError) {
      err = APIError.badRequest("Invalid Token Supplied")
    }
    next(err);
  }
};


exports.verifyRoles = allowedRole => (req, res, next)=>{
  try {
    if(allowedRole === req.userRole){
      return next()
    } 
    next(APIError.unauthorized(`Unauthorized! you can not access this route because you are a ${req.userRole}`))
      
  } catch (error) {
    next(error)
  }
}

