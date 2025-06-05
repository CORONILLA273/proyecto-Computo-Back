import UserRepository from "../repositories/userRepository.js"
import TokenService from "./tokenService.js"
import { User } from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository()
        this.tokenService = new TokenService()
    }

    async getAll() {
        return await this.userRepository.getAll()
    }

    async create(userData) {
        const { fullName, email, password, businessName, industry, domain, product, type, storage_size } = userData

        // Verificar si no hay otro registro con el mismo nombre
        const uniqueFullname = await this.userRepository.findByFullname(fullName)
        if(uniqueFullname) {
            throw { message: 'There is already a user with the same name', statusCode: 400 }
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ ...userData, password: hashedPassword })
        return this.userRepository.create({...newUser})
    }

    async login(email, password) {
        const foundUser = await this.userRepository.findByEmail(email)
        if(!foundUser) {
            throw { message: 'User not found', statusCode: 404 }
        }

        const existingToken = await this.userRepository.getSessionToken(foundUser.id)
        if (existingToken) {
            try {
                jwt.verify(existingToken, process.env.JWT_SECRET)
                throw { message: 'User has already logged in', statusCode: 401 }
            } catch (err) {
                console.log('Token anterior expirado, se permite nuevo login.')
                await this.userRepository.updateSessionToken(foundUser.id, null)
            }
        }

        const validPassword = await bcrypt.compare(password, foundUser.password)
        if(!validPassword) {
            throw { message: 'Invalid password', statusCode: 401 }
        }

        const token = jwt.sign({ 
            id: foundUser.id, 
            email: foundUser.email, 
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        await this.userRepository.updateSessionToken(foundUser.id, token)
        return token
    }

    async logout(userId, token) {
        const sessionToken = await this.userRepository.getSessionToken(userId)

        if(sessionToken !== token) {
            throw { message: 'Invalid token', statusCode: 401 }
        }

        await this.userRepository.updateSessionToken(userId, null)
        await TokenService.revokedToken(token)
    }

    async getByUser(usuario) {
        const user = await this.userRepository.findByUser(usuario)

        if(!user) {
            throw { message: 'El usuario no existe', statusCode: 404 }
        }

        return user
    }

    async getById(userId) {
        const user = await this.userRepository.findById(userId)
        
        if(!user) {
            throw { message: 'El usuario no existe', statusCode: 404 }
        }

        return user
    }
}