import fs from "fs"
import { sm } from "./app.js"
import { productModel } from './dao/models/products.model.js';

class ProductManager{
    productModel
    constructor(path){
        this.productos= [],
        this.path = path
        this.productModel = productModel
    }

    async getProducts(limit){
        try{
            if(typeof(limit) != Number || limit < 1)
                limit = 10
           let res = await this.productModel.find().sort({_id:-1}).limit(limit)
           let products = []

           res.forEach((p) => {
            products.push({
                id: p._id, 
                title: p.title,
                code: p.code,
                description: p.description,
                price: p.price 
            })
           }             
        )
           return products
        }
        catch(err){
            this.productos = []
        }
    }

    async getProductByID(id){
        let res =  await this.productModel.findOne({_id: id})
        return res
    }
    
    async deleteProductByID(id){
        let result
        try{
            result = await this.productModel.deleteMany({_id: id})
            if (result.deletedCount>0)
                return true
            
            return false   
        }
        catch(e){
            console.log("ERROR: " + e)
            return false
        }
     }
    
    async updateProduct(id , p){
         await this.productModel.updateOne({_id: id}, {
            title: p.title,
            description: p.description,
            price: p.price,
            thumbnails: p.thumbnails,
            status: p.status,
            stock: p.stock
         },function (err, docs){
            if (err){
                console.log ("Error actualizando "+err)
                return false
            }else{
                return true
            }
         })    
      }

    async addProduct(p){
        try{   
            let result = await this.productModel.create(p)
            sm.avisarQueActualizaronProductos(result._id)
            return true    
        }
        catch(error){
            sm.avisarQueActualizaronProductos(false)
            return false
        }
    }
}

export {ProductManager};