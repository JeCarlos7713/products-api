import Product from "../services/product.js";

const get = async (fastify, opt, done) => {
    fastify.route({
        url: "/products",
        method: ["GET"],
        handler: async (req, reply) => {
            try {
                const products = new Product()

                const all = await products.getAll().then(products => products)
                console.log("Produtos:")
                console.dir(all)
                reply.code(200).send(all)
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error', error: error });
            }
        }
    })

    done()
}

const create = async(fastify, opt, done) => {
    fastify.route({
        url: "/products",
        method: ["POST"],
        handler: async (req, reply) => {
            try {
                const {titulo, valor, descricao, image} = req.body
                
                if ([titulo, valor, descricao, image].includes("")) {
                    
                    reply.code(400).send({ code: '400', message: 'Existe parâmetros que faltam para realizar o cadastro' });
                    return false
                }
                
                const products = new Product(titulo, valor, descricao, image)

                const createProduct = await products.create()
                reply.code(200).send(createProduct)
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error', error: error });
            }
        }
    })

    done()
}

const findProduct = async(fastify, opt, done) =>{

    fastify.route({
        url: "/products/find",
        method: ["GET"],
        handler: async (req, reply) => {
            try {
                const {name} = req.query
                
                if ([name].includes("") || name == undefined) {
                    
                    reply.code(400).send({ code: '400', message: 'Existe parâmetros que faltam para realizar o cadastro' });
                    return false
                }
                
                const products = new Product(name)

                const find = await products.getProduct()
                reply.code(200).send(find)
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error', error: error.toString() });
            }
        }
    })

    done()
}

const update = async(fastify, opt, done) => {

    fastify.route({
        url: "/products/:id",
        method: ["PUT"],
        handler: async (req, reply) => {
            try {
                const id = req.params.id
                const {titulo, valor, descricao, image} = req.body
                
                if ([id, titulo, valor, descricao, image].includes("") || [id, titulo, valor, descricao, image].includes(undefined)) {
                    
                    reply.code(400).send({ 
                        code: '400', 
                        message: 'Existe parâmetros que faltam para realizar o cadastro', 
                        request: {id, titulo, valor, descricao, image}
                    });
                    return false
                }
                
                const products = new Product(titulo, valor, descricao, image)

                const [updatedProduct] = await products.update(id)
                updatedProduct == 0 ? reply.code(400).send({message: "Produto não encontrado!!", update: updatedProduct}) : reply.code(200).send({message: "Update success!!", update: updatedProduct})
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error', error: error });
            }
        }
    })

    done()

}

const deleteProduct = (fastify, opt, done) => {
    fastify.route({
        url: "/products/:id",
        method: ["DELETE"],
        handler: async (req, reply) => {
            try {
                const id = req.params.id
                
                if (id == "") {
                    
                    reply.code(400).send({ code: '400', message: 'Existe parâmetros que faltam para realizar o cadastro' });
                    return false
                }
                
                const products = new Product()

                const deletedPrd = await products.delete(id)

                deletedPrd == 0 ? reply.code(400).send({message: "Deleted success!!", deleted: deletedPrd}) : reply.code(200).send({message: "Produto não encontrado!!", deleted: deletedPrd})
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error', error: error });
            }
        }
    })

    done()
}

export {get, create, findProduct, update, deleteProduct}