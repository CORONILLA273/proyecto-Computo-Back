import StoreService from '../services/storeService.js'

export default class StoreController {
    constructor() {
        this.storeService = new StoreService()
    }

    async getAllStores(req, res, next) {
        try {
            const stores = await this.storeService.getAllStores()
            res.status(200).json(stores)
        } catch (error) {
            next(error)
        }
    }

    async addStore(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const store = await this.storeService.addStore(req.body)
            res.status(201).json(store)
        } catch (error) {
            next(error)
        }
    }

    async updateStore(req, res, next) {
        try {
            const store = await this.storeService.updateStore(req.params.id, req.body)
            res.status(200).json(store)
        } catch (error) {
            next(error)
        }
    }

    async deleteStore(req, res, next) {
        try {
            await this.storeService.deleteStore(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleStoreStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const store = await this.storeService.toggleStoreStatus(req.params.id, req.body.status)
                res.status(200).json(store)
            } catch (error) {
                next(error)
            }
        }
}