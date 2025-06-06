import express from 'express'
import ProductController from '../controllers/productController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const productController = new ProductController()

const productRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllProducts',
        protected: false
    },
    {
        method: 'post',
        path: '/addProduct',
        handler: 'addProduct',
        protected: true
    },
    {
        method: 'put',
        path: '/updateProduct/:id',
        handler: 'updateProduct',
        protected: true
    },
    {
        method: 'delete',
        path: '/deleteProduct/:id',
        handler: 'deleteProduct',
        protected: true
    },
    {
        method: 'get',
        path: '/:id',
        handler: 'getProductById',
        protected: false
    }
]

productRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        productController[route.handler].bind(productController)
    )
})

export default router
