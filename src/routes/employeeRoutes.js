import express from 'express'
import EmployeeController from '../controllers/employeeController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const employeeController = new EmployeeController()

const employeeRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllEmployees'
    },
    {
        method: 'get',
        path: '/:fullName',
        // middleware: []
        handler: 'getEmployeeByName'
    },
    {
        method: 'post',
        path: '/addEmployee',
        // middleware: []
        handler: 'addEmployee'
    },
    {
        method: 'put',
        path: '/updateEmployee/:id',
        // middleware: []
        handler: 'updateEmployee'
    },
    {
        method: 'delete',
        path: '/deleteEmployee/:id',
        // middleware: []
        handler: 'deleteEmployee'
    },
    {
        method: 'patch',
        path: '/toggleEmployeeStatus/:id',
        // middleware: []
        handler: 'toggleEmployeeStatus'
    },
]

employeeRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ employeeController[route.handler].bind(employeeController)
    )
})

export default router