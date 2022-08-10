const { productModel } = require("../Models/products.model")
const { buildResponse } = require("../utils")
const { APIError } = require("../utils/err")

const getProducts = async(req,res,next)=>{
    try {
        const products = await productModel
        .find({})
        .populate({
            path: "seller",
            select: ["_id", "username"]
        })
        res.json(buildResponse(`Products fetched successfully`, products))
    } catch (err) {
        next(err)
    }
}



const createProduct = async(req,res,next)=>{
    try {
            const {cost, amountAvailable, productName} = req.body
            if(!amountAvailable || !productName){
                return next(
                    APIError.badRequest(`amountAvailable and/or productName is missing. Kindly provide it!`)
                )
            }
            if( Number(cost) % 5 !== 0){
                return next(
                    APIError.badRequest(`Invalid entry! Your cost must be a multiple of 5`)
                    )
            }

            const product = await productModel.create({
                amountAvailable,
                productName,
                seller: req.userId,
                cost
            })

            res.status(201).json(buildResponse(`A new product has been created successfully`, product))

    } catch (err) {
        next(err)
    }
}


const updateProduct = async(req,res,next)=>{
try {
    const {productId} = req.params
    const product = req.body
    const productToUpdate = await productModel.findById(productId)
    if(!productToUpdate){
        return next(
            APIError.notFound(`No matching product found`)
        )
    }
    if(req.userId !== productToUpdate.seller.toString()){
        return next(
            APIError.unauthorized(`The product is not yours! Hence, you can not update it.`)
        )
    }
    
    await productModel.findByIdAndUpdate(productId, product)
    res.json(buildResponse(`Your product has been updated successfully`))


} catch (err) {
    next(err)
}
}

const deleteProduct = async(req,res,next)=>{
try {
    const {productId} = req.params
    const productToDelete = await productModel.findById(productId)
    if(!productToDelete){
        return next(
            APIError.notFound(`No matching product found`)
        )
    }
    if(req.userId !== productToDelete.seller.toString()){
        return next(
            APIError.unauthorized(`The product is not yours! Hence, you can not delete it.`)
        )
    }
    
    await productModel.findByIdAndDelete(productId)
    res.json(buildResponse(`Your product has been deleted successfully`))
} catch (err) {
    next(err)
}
}


const buyProduct = async(req,res,next)=>{
    try {
        const {productId, amountToBuy} = req.body
        if(!productId || amountToBuy){
            return next(
                APIError.badRequest(`Kindly Supply both the productId and the amount you intend to buy`)
            )
        }
        

    } catch (err) {
        next(err)
    }
}



module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    buyProduct
}