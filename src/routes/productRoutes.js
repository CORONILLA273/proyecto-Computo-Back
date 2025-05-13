import express from 'express'
import ProductController from '../controllers/productController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const productController = new ProductController()

const productRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllProducts'
    },
    {
        method: 'post',
        path: '/addProduct',
        // middleware: []
        handler: 'addProduct'
    },
    {
        method: 'put',
        path: '/updateProduct/:id',
        // middleware: []
        handler: 'updateProduct'
    },
    
    {
        method: 'delete',
        path: '/deleteProduct/:id',
        // middleware: []
        handler: 'deleteProduct'
    },
]

productRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ productController[route.handler].bind(productController)
    )
})

export default router