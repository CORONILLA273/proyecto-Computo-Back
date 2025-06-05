import express from 'express'
import PurchaseController from '../controllers/purchaseController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const purchaseController = new PurchaseController()

const purchaseRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllPurchases'
    },
    {
        method: 'post',
        path: '/addPurchase',
        handler: 'addPurchase',
        protected: true
    },
    {
        method: 'put',
        path: '/updatePurchase/:id',
        handler: 'updatePurchase',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deletePurchase/:id',
        handler: 'deletePurchase',
        protected: true
    },
    {
        method: 'patch',
        path: '/togglePurchaseStatus/:id',
        handler: 'togglePurchaseStatus',
        protected: true
    },
]

purchaseRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        purchaseController[route.handler].bind(purchaseController)
    )
})

export default router