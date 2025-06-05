import StockRepository from '../repositories/stockRepository.js'
import { Stock } from '../models/Stock.js'

export default class StockService {
    constructor() {
        this.stockRepository = new StockRepository()
    }

    async getAllStocks() {
        return await this.stockRepository.getAllStocks()
    }

    async addStock(stockData) {

        const newStock = new Stock({ ...stockData })
        return this.stockRepository.addStock({ ...newStock })
    }

    async updateStock(id, stockData) {
        const updateStock = await this.stockRepository.getStockById(id)
        if(!updateStock) {
            throw { message: 'Stock Not Found', statusCode: 404 }
        }

        const updatedStock = new Stock({ ...updateStock, ...stockData })
        return this.stockRepository.updateStock(id, { ...updatedStock })
    }

    async deleteStock(id) {
        const deleteStock = await this.stockRepository.deleteStock(id)
        if (!deleteStock) {
            throw { message: 'Stock Not Found', statusCode: 404 }
        }
        return this.stockRepository.deleteStock(id)
    }

    async toggleStockStatus(id, newStatus) {
            const toggleStockStatus = await this.stockRepository.getStockById(id)
            if (!toggleStockStatus) {
                throw { message: 'Stock Not Found', statusCode: 404 }
            }
            return this.stockRepository.toggleStockStatus(id, newStatus)
        }
}