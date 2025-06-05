import StoreRepository from '../repositories/storeRepository.js'
import { Store } from '../models/Store.js'

export default class StoreService {
    constructor() {
        this.storeRepository = new StoreRepository()
    }

    async getAllStores() {
        return await this.storeRepository.getAllStores()
    }

    async addStore(storeData) {
        const { storeName } = storeData

        // Verificar que sea producto único
        const uniqueStore = await this.storeRepository.findStoreByName(storeName)
        if (uniqueStore) {
            throw { message: 'The Store Is Already Exists', statusCode: 400 }
        }

        const newStore = new Store({ ...storeData })
        return this.storeRepository.addStore({ ...newStore })
    }

    async updateStore(id, storeData) {
        const updateStore = await this.storeRepository.getStoreById(id)
        if(!updateStore) {
            throw { message: 'Store Not Found', statusCode: 404 }
        }

        const updatedStore = new Store({ ...updateStore, ...storeData })
        return this.storeRepository.updateStore(id, { ...updatedStore })
    }

    async deleteStore(id) {
        const deleteStore = await this.storeRepository.deleteStore(id)
        if (!deleteStore) {
            throw { message: 'Store Not Found', statusCode: 404 }
        }
        return this.storeRepository.deleteStore(id)
    }

    async toggleStoreStatus(id, newStatus) {
            const toggleStoreStatus = await this.storeRepository.getStoreById(id)
            if (!toggleStoreStatus) {
                throw { message: 'Store Not Found', statusCode: 404 }
            }
            return this.storeRepository.toggleStoreStatus(id, newStatus)
        }
}