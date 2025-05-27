import express from 'express'
import CategoryController from '../controllers/categoryController.js'
// import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const categoryController = new CategoryController()

const categoryRoutes = [
    {
        method: 'get',
        path: '/',
        // middleware: []
        handler: 'getAllCategories'
    },
    {
        method: 'post',
        path: '/addCategory',
        // middleware: []
        handler: 'addCategory'
    },
    {
        method: 'put',
        path: '/updateCategory/:id',
        // middleware: []
        handler: 'updateCategory'
    },
    
    {
        method: 'delete',
        path: '/deleteCategory/:id',
        // middleware: []
        handler: 'deleteCategory'
    },
    {
        method: 'patch',
        path: '/toggleCategoryStatus/:id',
        // middleware: []
        handler: 'toggleCategoryStatus'
    },
]

categoryRoutes.forEach(route => {
    router[route.method](
        route.path,
        /* ...route.middleware, */ categoryController[route.handler].bind(categoryController)
    )
})

export default router