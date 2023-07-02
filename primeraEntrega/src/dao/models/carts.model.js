import mongoose from "mongoose";

const productCollection = "carts"

const productSchema = new mongoose.Schema({
    title:{type: String, require: true},
    description:String,
    price:Number,
    thumbnails:[String],
    code:{type: String, require:true , unique:true },
    status:Boolean,
    stock:Number
})

export const productModel = mongoose.model(productCollection, productSchema)