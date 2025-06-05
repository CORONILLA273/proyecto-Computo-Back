import express from 'express'
import CustomerController from '../controllers/customerController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const customerController = new CustomerController()

const customerRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllCustomers'
    },
    {
        method: 'post',
        path: '/addCustomer',
        handler: 'addCustomer',
        protected: true
    },
    {
        method: 'put',
        path: '/updateCustomer/:id',
        handler: 'updateCustomer',
        protected: true
    },
    {
        method: 'delete',
        path: '/deleteCustomer/:id',
        handler: 'deleteCustomer',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleCustomerStatus/:id',
        handler: 'toggleCustomerStatus',
        protected: true
    },
]

customerRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        customerController[route.handler].bind(customerController)
    )
})

export default router