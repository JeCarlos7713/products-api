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
                reply.code(500).send({ code: '500', message: 'Internal Server Error' });
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

                const all = await products.create()
                console.log("######### CRIAÇÃO ########")
                console.log(all.id)
                reply.code(200).send(all)
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error' });
            }
        }
    })

    done()
}

export {get, create}