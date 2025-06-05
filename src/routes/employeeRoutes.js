import express from 'express'
import EmployeeController from '../controllers/employeeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const employeeController = new EmployeeController()

const employeeRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllEmployees'
    },
    {
        method: 'get',
        path: '/:fullName',
        handler: 'getEmployeeByName'
    },
    {
        method: 'post',
        path: '/addEmployee',
        handler: 'addEmployee',
        protected: true
    },
    {
        method: 'put',
        path: '/updateEmployee/:id',
        handler: 'updateEmployee',
        protected: true
    },
    {
        method: 'delete',
        path: '/deleteEmployee/:id',
        handler: 'deleteEmployee',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleEmployeeStatus/:id',
        handler: 'toggleEmployeeStatus',
        protected: true
    },
]

employeeRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        employeeController[route.handler].bind(employeeController)
    )
})

export default router