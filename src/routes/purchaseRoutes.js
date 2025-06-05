import express from 'express'
import PurchaseController from '../controllers/purchaseController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const purchaseController = new PurchaseController()

const purchaseRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllPurchases'
    },
    {
        method: 'post',
        path: '/addPurchase',
        // middleware: []
        handler: 'addPurchase'
    },
    {
        method: 'put',
        path: '/updatePurchase/:id',
        // middleware: []
        handler: 'updatePurchase'
    },
    
    {
        method: 'delete',
        path: '/deletePurchase/:id',
        // middleware: []
        handler: 'deletePurchase'
    },
    {
        method: 'patch',
        path: '/togglePurchaseStatus/:id',
        // middleware: []
        handler: 'togglePurchaseStatus'
    },
]

purchaseRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ purchaseController[route.handler].bind(purchaseController)
    )
})

export default router