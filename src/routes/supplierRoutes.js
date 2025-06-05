import express from 'express'
import SupplierController from '../controllers/supplierController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const supplierController = new SupplierController()

const supplierRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllSuppliers'
    },
    {
        method: 'post',
        path: '/addSupplier',
        handler: 'addSupplier',
        protected: true
    },
    {
        method: 'put',
        path: '/updateSupplier/:id',
        handler: 'updateSupplier',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteSupplier/:id',
        handler: 'deleteSupplier',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleSupplierStatus/:id',
        handler: 'toggleSupplierStatus',
        protected: true
    },
]

supplierRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        supplierController[route.handler].bind(supplierController)
    )
})

export default router