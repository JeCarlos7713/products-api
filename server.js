import Fastify from 'fastify'
import cors from '@fastify/cors'
import {
    get, 
    create, 
    update, 
    findProduct, 
    deleteProduct 
} from "./routes/products.js"


const fastify = Fastify({
    logger : true
})
await fastify.register(cors, { 
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})

fastify.register(get)
fastify.register(create)
fastify.register(update)
fastify.register(findProduct)
fastify.register(deleteProduct)

await fastify.listen({ port: 3000 })