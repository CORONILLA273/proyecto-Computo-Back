import PurchaseRepository from '../repositories/purchaseRepository.js'
import { Purchase } from '../models/Purchase.js'

export default class PurchaseService {
    constructor() {
        this.purchaseRepository = new PurchaseRepository()
    }

    async getAllPurchases() {
        return await this.purchaseRepository.getAllPurchases()
    }

    async addPurchase(purchaseData) {
        
        const newPurchase = new Purchase({ ...purchaseData })
        return this.purchaseRepository.addPurchase({ ...newPurchase })
    }

    async updatePurchase(id, purchaseData) {
        const updatePurchase = await this.purchaseRepository.getPurchaseByiId(id)
        if(!updatePurchase) {
            throw { message: 'Purchase Not Found', statusCode: 404 }
        }

        const updatedPurchase = new Purchase({ ...updatePurchase, ...purchaseData })
        return this.purchaseRepository.updatePurchase(id, { ...updatedPurchase })
    }

    async deletePurchase(id) {
        const deletePurchase = await this.purchaseRepository.deletePurchase(id)
        if (!deletePurchase) {
            throw { message: 'Purchase Not Found', statusCode: 404 }
        }
        return this.purchaseRepository.deletePurchase(id)
    }

    async togglePurchaseStatus(id, newStatus) {
            const togglePurchaseStatus = await this.purchaseRepository.getPurchaseByiId(id)
            if (!togglePurchaseStatus) {
                throw { message: 'Purchase Not Found', statusCode: 404 }
            }
            return this.purchaseRepository.togglePurchaseStatus(id, newStatus)
        }
}