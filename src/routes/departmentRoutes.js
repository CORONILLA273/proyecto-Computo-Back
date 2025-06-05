import express from 'express'
import DepartmentController from '../controllers/departmentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const departmentController = new DepartmentController()

const departmentRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllDepartments',
        protected: false
    },
    {
        method: 'post',
        path: '/addDepartment',
        handler: 'addDepartment',
        protected: true
    },
    {
        method: 'put',
        path: '/updateDepartment/:id',
        handler: 'updateDepartment',
        protected: true
    },
    {
        method: 'delete',
        path: '/deleteDepartment/:id',
        handler: 'deleteDepartment',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleDepartmentStatus/:id',
        handler: 'toggleDepartmentStatus',
        protected: true
    },
]

departmentRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        departmentController[route.handler].bind(departmentController)
    )
})

export default router