const {model, Schema} = require('mongoose')



const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    deposit:{
        type: Number,
        default: 0
    },
    role:{
        type: String,
        required: [true, 'The role field can not be empty'],
        // default: "seller",
        enum: {
          values:  ["seller", "buyer"],
          message: '{VALUE} is not allowed!'
        }
    },
    refreshToken:{
        type: String
        
    }
}, 
{
    timestamps: true
})


const UserModel = new model("user", UserSchema)




module.exports = {UserModel}