import SupplierRepository from '../repositories/supplierRepository.js'
import { Supplier } from '../models/Supplier.js'

export default class SupplierService {
    constructor() {
        this.SupplierRepository = new SupplierRepository()
    }

    async getAllSuppliers() {
        return await this.SupplierRepository.getAllSuppliers()
    }

    async addSupplier(supplierData) {
        const { fullName } = supplierData

        // Verificar que sea producto único
        const uniqueSupplier = await this.SupplierRepository.findSupplierByName(fullName)
        if (uniqueSupplier) {
            throw { message: 'The Supplier Is Already Exists', statusCode: 400 }
        }

        const newSupplier = new Supplier({ ...supplierData })
        return this.SupplierRepository.addSupplier({ ...newSupplier })
    }

    async updateSupplier(id, supplierData) {
        const updateSupplier = await this.SupplierRepository.getSupplierById(id)
        if(!updateSupplier) {
            throw { message: 'Supplier Not Found', statusCode: 404 }
        }

        const updatedSupplier = new Supplier({ ...updateSupplier, ...supplierData })
        return this.SupplierRepository.updateSupplier(id, { ...updatedSupplier })
    }

    async deleteSupplier(id) {
        const deleteSupplier = await this.SupplierRepository.deleteSupplier(id)
        if (!deleteSupplier) {
            throw { message: 'Supplier Not Found', statusCode: 404 }
        }
        return this.SupplierRepository.deleteSupplier(id)
    }
}