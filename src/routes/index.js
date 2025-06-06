import express from 'express'
import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import customerRoutes from './customerRoutes.js'
import employeeRoutes from './employeeRoutes.js'
import supplierRoutes from './supplierRoutes.js'
import departmentRoutes from './departmentRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import purchaseRoutes from './purchaseRoutes.js'
import storeRoutes from './storeRoutes.js'
import stockRoutes from './stockRoutes.js'
import saleRoutes from './saleRoutes.js'
import shipmentRoutes from './shipmentRoutes.js'
import invoiceRoutes from './invoiceRoutes.js'
import paymentRoutes from './paymentRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API v1' })
})

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/customers', customerRoutes)
router.use('/employees', employeeRoutes)
router.use('/suppliers', supplierRoutes)
router.use('/departments', departmentRoutes)
router.use('/categories', categoryRoutes)
router.use('/purchases', purchaseRoutes)
router.use('/stores', storeRoutes)
router.use('/stocks', stockRoutes)
router.use('/sales', saleRoutes)
router.use('/shipments', shipmentRoutes)
router.use('/invoices', invoiceRoutes)
router.use('/payments', paymentRoutes)

export default router