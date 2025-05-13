import express from 'express'
import UserController from '../controllers/userController.js'

const router = express.Router()
const userController = new UserController()

const userRoutes = [
    {
        method: 'get',
        path: '/',
        handle: 'getAll'
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
        handle: 'logout'
    }
]

userRoutes.forEach(route => {
    router[route.method](
        route.path,
        userController[route.handle].bind(userController)
    )
})

export default router