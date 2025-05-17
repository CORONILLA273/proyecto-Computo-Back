import express from 'express'
import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import customerRoutes from './customerRoutes.js'
import employeeRoutes from './employeeRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/customers', customerRoutes)
router.use('/employees', employeeRoutes)

export default router