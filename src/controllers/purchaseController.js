import PurchaseService from '../services/purchaseService.js'

export default class PurchaseController {
    constructor() {
        this.purchaseService = new PurchaseService()
    }

    async getAllPurchases(req, res, next) {
        try {
            const purchases = await this.purchaseService.getAllPurchases()
            res.status(200).json(purchases)
        } catch (error) {
            next(error)
        }
    }

    async addPurchase(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const purchase = await this.purchaseService.addPurchase(req.body)
            res.status(201).json(purchase)
        } catch (error) {
            next(error)
        }
    }

    async updatePurchase(req, res, next) {
        try {
            const purchase = await this.purchaseService.updatePurchase(req.params.id, req.body)
            res.status(200).json(purchase)
        } catch (error) {
            next(error)
        }
    }

    async deletePurchase(req, res, next) {
        try {
            await this.purchaseService.deletePurchase(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async togglePurchaseStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const purchase = await this.purchaseService.togglePurchaseStatus(req.params.id, req.body.status)
                res.status(200).json(purchase)
            } catch (error) {
                next(error)
            }
        }
}