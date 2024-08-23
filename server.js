import Fastify from 'fastify'
import cors from '@fastify/cors'
import { get, create } from "./routes/products.js"


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

await fastify.listen({ port: 3000 })