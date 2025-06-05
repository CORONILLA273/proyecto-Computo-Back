import IStockRepository from '../interfaces/IStockRepository.js'
import { db } from '../config/firebase.js'

export default class StockRepository extends IStockRepository {
    constructor() {
        super()
        this.collection = db.collection('stocks')
    }

    async addStock(stock) {
        const newStock = await this.collection.add(stock)
        return { id: newStock.id, ...stock }
    }

    async updateStock(id, updateStock) {
        await this.collection.doc(id).update(updateStock)
        return { id, ...updateStock }
    }

    async deleteStock(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Stock Deleted'}
    }
    
    async getAllStocks() {
        const stocks = await this.collection.get()
        return stocks.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getStockById(id) {
        const stock = await this.collection.doc(id).get()
        return stock.exists ? { id, ...stock.data() } : null
    }

    async toggleStockStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}