import IStoreRepository from '../interfaces/IStoreRepository.js'
import { db } from '../config/firebase.js'

export default class StoreRepository extends IStoreRepository {
    constructor() {
        super()
        this.collection = db.collection('stores')
    }

    async addStore(store) {
        const newStore = await this.collection.add(store)
        return { id: newStore.id, ...store }
    }

    async updateStore(id, updateStore) {
        await this.collection.doc(id).update(updateStore)
        return { id, ...updateStore }
    }

    async deleteStore(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Store Deleted'}
    }
    
    async getAllStores() {
        const stores = await this.collection.get()
        return stores.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async findStoreByName(storeName) {
        const store = await this.collection.where('storeName', '==', storeName).get()
        return store.empty ? null : store.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))[0]
    }

    async getStoreById(id) {
        const store = await this.collection.doc(id).get()
        return store.exists ? { id, ...store.data() } : null
    }

    async toggleStoreStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}