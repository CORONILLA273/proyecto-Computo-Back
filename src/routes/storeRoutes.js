import express from 'express'
import StoreController from '../controllers/storeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const storeController = new StoreController()

const storeRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllStores'
    },
    {
        method: 'post',
        path: '/addStore',
        handler: 'addStore',
        protected: true
    },
    {
        method: 'put',
        path: '/updateStore/:id',
        handler: 'updateStore',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteStore/:id',
        handler: 'deleteStore',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleStoreStatus/:id',
        handler: 'toggleStoreStatus',
        protected: true
    },
]

storeRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        storeController[route.handler].bind(storeController)
    )
})

export default router