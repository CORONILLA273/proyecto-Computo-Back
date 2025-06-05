import express from 'express'
import SaleController from '../controllers/saleController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const saleController = new SaleController()

const saleRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllSales'
    },
    {
        method: 'post',
        path: '/addSale',
        handler: 'addSale',
        protected: true
    },
    {
        method: 'put',
        path: '/updateSale/:id',
        handler: 'updateSale',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteSale/:id',
        handler: 'deleteSale',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleSaleStatus/:id',
        handler: 'toggleSaleStatus',
        protected: true
    },
]

saleRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        saleController[route.handler].bind(saleController)
    )
})

export default router