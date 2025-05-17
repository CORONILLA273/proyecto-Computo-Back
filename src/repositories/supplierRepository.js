import ISupplierRepository from '../interfaces/ISupplierRepository.js'
import { db } from '../config/firebase.js'

export default class SupplierRepository extends ISupplierRepository {
    constructor() {
        super()
        this.collection = db.collection('suppliers')
    }

    async addSupplier(supplier) {
        const newSupplier = await this.collection.add(supplier)
        return { id: newSupplier.id, ...supplier }
    }

    async updateSupplier(id, updateSupplier) {
        await this.collection.doc(id).update(updateSupplier)
        return { id, ...updateSupplier }
    }

    async deleteSupplier(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Product Deleted'}
    }
    
    async getAllSuppliers() {
        const suppliers = await this.collection.get()
        return suppliers.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async findSupplierByName(fullName) {
        const supplier = await this.collection.where('fullName', '==', fullName).get()
        return supplier.empty ? null : supplier.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))[0]
    }

    async getSupplierById(id) {
        const supplier = await this.collection.doc(id).get()
        return supplier.exists ? { id, ...supplier.data() } : null
    }
}