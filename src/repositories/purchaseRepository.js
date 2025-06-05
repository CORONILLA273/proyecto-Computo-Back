import IPurchaseRepository from '../interfaces/IPurchaseRepository.js'
import { db } from '../config/firebase.js'

export default class PurchaseRepository extends IPurchaseRepository {
    constructor() {
        super()
        this.collection = db.collection('purchases')
    }

    async addPurchase(purchase) {
        const newPurchase = await this.collection.add(purchase)
        return { id: newPurchase.id, ...purchase }
    }

    async updatePurchase(id, updatePurchase) {
        await this.collection.doc(id).update(updatePurchase)
        return { id, ...updatePurchase }
    }

    async deletePurchase(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Purchase Deleted'}
    }
    
    async getAllPurchases() {
        const purchases = await this.collection.get()
        return purchases.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getPurchaseById(id) {
        const purchase = await this.collection.doc(id).get()
        return purchase.exists ? { id, ...purchase.data() } : null
    }

    async togglePurchaseStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}