import express from 'express'
import InvoiceController from '../controllers/invoiceController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const invoiceController = new InvoiceController()

const invoiceRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllInvoices'
    },
    {
        method: 'post',
        path: '/addInvoice',
        handler: 'addInvoice',
        protected: true
    },
    {
        method: 'put',
        path: '/updateInvoice/:id',
        handler: 'updateInvoice',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteInvoice/:id',
        handler: 'deleteInvoice',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleInvoiceStatus/:id',
        handler: 'toggleInvoiceStatus',
        protected: true
    },
]

invoiceRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        invoiceController[route.handler].bind(invoiceController)
    )
})

export default router