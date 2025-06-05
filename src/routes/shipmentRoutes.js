import express from 'express'
import ShipmentController from '../controllers/shipmentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const shipmentController = new ShipmentController()

const shipmentRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllShipments'
    },
    {
        method: 'post',
        path: '/addShipment',
        handler: 'addShipment',
        protected: true
    },
    {
        method: 'put',
        path: '/updateShipment/:id',
        handler: 'updateShipment',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteShipment/:id',
        handler: 'deleteShipment',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleShipmentStatus/:id',
        handler: 'toggleShipmentStatus',
        protected: true
    },
]

shipmentRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        shipmentController[route.handler].bind(shipmentController)
    )
})

export default router