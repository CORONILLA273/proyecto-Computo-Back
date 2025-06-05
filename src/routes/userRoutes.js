import express from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const userController = new UserController()

const userRoutes = [
    {
        method: 'get',
        path: '/',
        handle: 'getAll',
    },
    {
        method: 'post',
        path: '/create',
        handle: 'create'
    },
    {
        method: 'post',
        path: '/login',
        handle: 'login'
    },
    {
        method: 'post',
        path: '/logout',
        handle: 'logout',
        protected: true
    },
    {
        method: 'get',
        path: '/user',
        handle: 'getUserByUsername',
        protected: true
    }
]

userRoutes.forEach(route => {
    const middlewares = route.protected ? [authMiddleware] : []
    router[route.method](
        route.path,
        ...middlewares,
        userController[route.handle].bind(userController)
    )
})

export default router