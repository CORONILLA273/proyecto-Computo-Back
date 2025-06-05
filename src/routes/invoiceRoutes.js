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
        protected: false
    },
    {
        method: 'put',
        path: '/updateInvoice/:id',
        handler: 'updateInvoice',
        protected: false
    },
    
    {
        method: 'delete',
        path: '/deleteInvoice/:id',
        handler: 'deleteInvoice',
        protected: false
    },
    {
        method: 'patch',
        path: '/toggleInvoiceStatus/:id',
        handler: 'toggleInvoiceStatus',
        protected: false
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