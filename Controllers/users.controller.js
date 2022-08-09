const {UserModel} = require('../Models/users.model');
const { buildResponse, buildUser } = require("../utils/index");
const { APIError } = require("../utils/err");

exports.deposit = async (req, res, next) => {
  try {
    const { deposit } = req.body;
    if (!deposit) {
      return next(
        APIError.badRequest("Deposit field is missing, please try again")
      );
    }
    const amount = Number(deposit);
    if (amount % 5 !== 0) {
      return next(APIError.badRequest("The amount has to be multiple of 5"));
    }
    // const user = UserModel.findByIdAndUpdate(req.userId, {
    //   $inc: {deposit:amount},
    // });
    const user = await UserModel.findById(req.userId)
    if (user) {
      user.deposit = user.deposit + amount;
    }
    await user.save();

    res.json(buildResponse("Your account has been credited successfully"));
  } catch (error) {
    next(error);
  }
};
exports.details = async (req, res, next) => {
  try {
    const userData = await UserModel.findById(req.userId);
    const data = buildUser(userData.toObject());
    res.json(buildResponse("Account Fetched Successfully", data));
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
    try {
        const {username} = req.body
        if(!username){
            return next(APIError.badRequest(`The fields can not be left empty!`))
        }
        const updateUser = await UserModel.findById(req.userId)
        updateUser.username = username
        await updateUser.save()
        res.json(buildResponse(`Your account has been updated successfully. Your new username is ${username}`))
    } catch (err) {
        next(err)
    }
};
exports.delete_ = async (req, res, next) => {};