import express from 'express'
import DepartmentController from '../controllers/departmentController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const departmentController = new DepartmentController()

const departmentRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllDepartments'
    },
    {
        method: 'post',
        path: '/addDepartment',
        // middleware: []
        handler: 'addDepartment'
    },
    {
        method: 'put',
        path: '/updateDepartment/:id',
        // middleware: []
        handler: 'updateDepartment'
    },
    {
        method: 'delete',
        path: '/deleteDepartment/:id',
        // middleware: []
        handler: 'deleteDepartment'
    },
    {
        method: 'patch',
        path: '/toggleDepartmentStatus/:id',
        // middleware: []
        handler: 'toggleDepartmentStatus'
    },
]

departmentRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ departmentController[route.handler].bind(departmentController)
    )
})

export default router