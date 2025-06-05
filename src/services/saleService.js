import SaleRepository from '../repositories/saleRepository.js'
import { Sale } from '../models/Sale.js'

export default class SaleService {
    constructor() {
        this.saleRepository = new SaleRepository()
    }

    async getAllSales() {
        return await this.saleRepository.getAllSales()
    }

    async addSale(saleData) {

        const newSale = new Sale({ ...saleData })
        return this.saleRepository.addSale({ ...newSale })
    }

    async updateSale(id, saleData) {
        const updateSale = await this.saleRepository.getSaleById(id)
        if(!updateSale) {
            throw { message: 'Sale Not Found', statusCode: 404 }
        }

        const updatedSale = new Sale({ ...updateSale, ...saleData })
        return this.saleRepository.updateSale(id, { ...updatedSale })
    }

    async deleteSale(id) {
        const deleteSale = await this.saleRepository.deleteSale(id)
        if (!deleteSale) {
            throw { message: 'Sale Not Found', statusCode: 404 }
        }
        return this.saleRepository.deleteSale(id)
    }

    async toggleSaleStatus(id, newStatus) {
            const toggleSaleStatus = await this.saleRepository.getSaleById(id)
            if (!toggleSaleStatus) {
                throw { message: 'Sale Not Found', statusCode: 404 }
            }
            return this.saleRepository.toggleSaleStatus(id, newStatus)
        }
}