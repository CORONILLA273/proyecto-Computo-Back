import express from 'express'
import CategoryController from '../controllers/categoryController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const categoryController = new CategoryController()

const categoryRoutes = [
    {
        method: 'get',
        path: '/',
        handler: 'getAllCategories'
    },
    {
        method: 'post',
        path: '/addCategory',
        handler: 'addCategory',
        protected: true
    },
    {
        method: 'put',
        path: '/updateCategory/:id',
        handler: 'updateCategory',
        protected: true
    },
    
    {
        method: 'delete',
        path: '/deleteCategory/:id',
        handler: 'deleteCategory',
        protected: true
    },
    {
        method: 'patch',
        path: '/toggleCategoryStatus/:id',
        handler: 'toggleCategoryStatus',
        protected: true
    },
]

categoryRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        categoryController[route.handler].bind(categoryController)
    )
})

export default router