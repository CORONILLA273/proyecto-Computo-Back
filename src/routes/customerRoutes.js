import express from 'express'
import CustomerController from '../controllers/customerController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const customerController = new CustomerController()

const customerRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllCustomers'
    },
    {
        method: 'post',
        path: '/addCustomer',
        // middleware: []
        handler: 'addCustomer'
    },
    {
        method: 'put',
        path: '/updateCustomer/:id',
        // middleware: []
        handler: 'updateCustomer'
    },
    {
        method: 'delete',
        path: '/deleteCustomer/:id',
        // middleware: []
        handler: 'deleteCustomer'
    },
    {
        method: 'patch',
        path: '/toggleCustomerStatus/:id',
        // middleware: []
        handler: 'toggleCustomerStatus'
    },
]

customerRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ customerController[route.handler].bind(customerController)
    )
})

export default router