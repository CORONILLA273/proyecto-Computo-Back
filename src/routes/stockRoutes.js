import express from 'express'
import StockController from '../controllers/stockController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const stockController = new StockController()

const stockRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllStocks'
    },
    {
        method: 'post',
        path: '/addStock',
        handler: 'addStock',
        protected: true
    },
    {
        method: 'put',
        path: '/updateStock/:id',
        handler: 'updateStock',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteStock/:id',
        handler: 'deleteStock',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleStockStatus/:id',
        handler: 'toggleStockStatus',
        protected: true
    },
]

stockRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        stockController[route.handler].bind(stockController)
    )
})

export default router