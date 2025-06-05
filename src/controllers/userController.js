import UserService from "../services/userService.js"
import TokenService from "../services/tokenService.js"

export default class UserController {
    constructor() {
        this.UserService = new UserService()
    }

    async getAll(req, res, next) {
        try {
            const users = await this.UserService.getAll()
            res.json({users})
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const userData = req.body
            const user = await this.UserService.create(userData)
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const token = await this.UserService.login(email, password)
            res.json({token})
        } catch (error) {
            next(error)
        }
    }
    
    async logout(req, res, next) {
        try {
            const authHeader = req.headers.authorization
            if(!authHeader) {
                throw { message: 'Not authorized', statusCode: 400 }
            }
            const token = authHeader.split(' ')[1]
            const userId = req.user.id
            await this.UserService.logout(userId, token)
            res.status(204).json({ message: 'Logout successful' })
        } catch (error) {
            next(error)
        }
    }

    async getUserByUsername(req, res, next) {
        try {
            const { usuario } = req.user
            if(!usuario) {
                throw { message: 'Usuario no encontrado', statusCode: 404 }
            }

            const user = await this.UserService.getByUser(usuario)
            if(!user) {
                throw { message: 'Usuario no encontrado', statusCode: 404 }
            }
            res.json({user})
        } catch (error) {
            next(error)
        }
    }

    async getUserFromToken(req, res) {
        console.log('User from token:', req.user)

        const userId = req.user.id
        const user = await this.UserService.getById(userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.json(user)
    }
}