import ISaleRepository from '../interfaces/ISaleRepository.js'
import { db } from '../config/firebase.js'

export default class SaleRepository extends ISaleRepository {
    constructor() {
        super()
        this.collection = db.collection('sales')
    }

    async addSale(sale) {
        const newSale = await this.collection.add(sale)
        return { id: newSale.id, ...sale }
    }

    async updateSale(id, updateSale) {
        await this.collection.doc(id).update(updateSale)
        return { id, ...updateSale }
    }

    async deleteSale(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Sale Deleted'}
    }
    
    async getAllSales() {
        const sales = await this.collection.get()
        return sales.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getSaleById(id) {
        const sale = await this.collection.doc(id).get()
        return sale.exists ? { id, ...sale.data() } : null
    }

    async toggleSaleStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}