const {Schema, model} = require('mongoose')
const { userRequired } = require('../Middleware/auth.middleware')


const productSchema = new Schema ({
    amountAvailable:{
        type: Number,
        required: true
    },
    cost:{
        type:Number,
        required: true,
        default: 0
    },
    productName:{
        type: String,
        required: true
    },
    seller:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},
{
    timestamps: true
})

const productModel = new model('product', productSchema)

module.exports = {
    productModel
}