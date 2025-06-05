import express from 'express'
import StockController from '../controllers/stockController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const stockController = new StockController()

const stockRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllStocks'
    },
    {
        method: 'post',
        path: '/addStock',
        // middleware: []
        handler: 'addStock'
    },
    {
        method: 'put',
        path: '/updateStock/:id',
        // middleware: []
        handler: 'updateStock'
    },
    
    {
        method: 'delete',
        path: '/deleteStock/:id',
        // middleware: []
        handler: 'deleteStock'
    },
    {
        method: 'patch',
        path: '/toggleStockStatus/:id',
        // middleware: []
        handler: 'toggleStockStatus'
    },
]

stockRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ stockController[route.handler].bind(stockController)
    )
})

export default router