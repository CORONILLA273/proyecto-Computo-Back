import SupplierService from '../services/supplierService.js'

export default class SupplierController {
    constructor() {
        this.supplierService = new SupplierService()
    }

    async getAllSuppliers(req, res, next) {
        try {
            const suppliers = await this.supplierService.getAllSuppliers()
            res.status(200).json(suppliers)
        } catch (error) {
            next(error)
        }
    }

    async addSupplier(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const supplier = await this.supplierService.addSupplier(req.body)
            res.status(201).json(supplier)
        } catch (error) {
            next(error)
        }
    }

    async updateSupplier(req, res, next) {
        try {
            const supplier = await this.supplierService.updateSupplier(req.params.id, req.body)
            res.status(200).json(supplier)
        } catch (error) {
            next(error)
        }
    }

    async deleteSupplier(req, res, next) {
        try {
            await this.supplierService.deleteSupplier(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}