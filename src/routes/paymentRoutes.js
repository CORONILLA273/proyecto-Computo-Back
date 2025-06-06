import express from 'express'
import PaymentController from '../controllers/paymentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const paymentController = new PaymentController()

const paymentRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllPayments'
    },
    {
        method: 'post',
        path: '/addPayment',
        handler: 'addPayment',
        protected: true
    },
    {
        method: 'put',
        path: '/updatePayment/:id',
        handler: 'updatePayment',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deletePayment/:id',
        handler: 'deletePayment',
        protected: true
    },
    {
        method: 'patch',
        path: '/togglePaymentStatus/:id',
        handler: 'togglePaymentStatus',
        protected: true
    },
]

paymentRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        paymentController[route.handler].bind(paymentController)
    )
})

export default router