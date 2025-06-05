import express from 'express'
import StoreController from '../controllers/storeController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const storeController = new StoreController()

const storeRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllStores'
    },
    {
        method: 'post',
        path: '/addStore',
        // middleware: []
        handler: 'addStore'
    },
    {
        method: 'put',
        path: '/updateStore/:id',
        // middleware: []
        handler: 'updateStore'
    },
    
    {
        method: 'delete',
        path: '/deleteStore/:id',
        // middleware: []
        handler: 'deleteStore'
    },
    {
        method: 'patch',
        path: '/toggleStoreStatus/:id',
        // middleware: []
        handler: 'toggleStoreStatus'
    },
]

storeRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ storeController[route.handler].bind(storeController)
    )
})

export default router