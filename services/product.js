import ProductsModel from "../models/ProductModel.js";

class Product {
    constructor(title, value, description, url){
        this.title          = title
        this.value          = value
        this.description    = description
        this.url            = url
    }

    async create (){
        ProductsModel.create(
            {
                title       : this.title,
                value       : this.value,
                description : this.description,
                img         : this.url
            },
            {fields : ["title", "value", "description", "url_img"]}
        )
    }

    async getAll(){
        return await ProductsModel.findAll()
        .then(user => JSON.stringify(user))
        .then(ret => JSON.parse(ret))
        .catch(error => error)
    }

    async getProduct(){
        return await ProductsModel.findAll({
            where : {
                title : this.title
            }
        })
    }

    async update(id){
        return await ProductsModel.update(
            {
                title       : this.title,
                value       : this.value,
                description : this.description,
                img         : this.url
            },
            {
                where : {
                    id: id
                }
            }
        )
    }

    async delete(id){
        await ProductsModel.destroy(
            {
                where : {
                    id : id
                }
            }
        )
    }
}

export default Product