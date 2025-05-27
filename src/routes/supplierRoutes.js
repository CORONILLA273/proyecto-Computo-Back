import express from 'express'
import SupplierController from '../controllers/supplierController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const supplierController = new SupplierController()

const supplierRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllSuppliers'
    },
    {
        method: 'post',
        path: '/addSupplier',
        // middleware: []
        handler: 'addSupplier'
    },
    {
        method: 'put',
        path: '/updateSupplier/:id',
        // middleware: []
        handler: 'updateSupplier'
    },
    
    {
        method: 'delete',
        path: '/deleteSupplier/:id',
        // middleware: []
        handler: 'deleteSupplier'
    },
    {
        method: 'patch',
        path: '/toggleSupplierStatus/:id',
        // middleware: []
        handler: 'toggleSupplierStatus'
    },
]

supplierRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ supplierController[route.handler].bind(supplierController)
    )
})

export default router