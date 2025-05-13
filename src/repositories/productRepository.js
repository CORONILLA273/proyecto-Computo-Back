import IProductRepository from '../interfaces/IProductRepository.js'
import { db } from '../config/firebase.js'

export default class ProductRepository extends IProductRepository {
    constructor() {
        super()
        this.collection = db.collection('products')
    }

    async addProduct(product) {
        const newProduct = await this.collection.add(product)
        return { id: newProduct.id, ...product }
    }

    async updateProduct(id, updateProduct) {
        await this.collection.doc(id).update(updateProduct)
        return { id, ...updateProduct }
    }

    async deleteProduct(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Product Deleted'}
    }
    
    async getAllProducts() {
        const products = await this.collection.get()
        return products.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async findProductByName(productName) {
        const products = await this.collection.where('productName', '==', productName).get()
        return products.empty ? null : products.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))[0]
    }

    async getProductById(id) {
        const product = await this.collection.doc(id).get()
        return product.exists ? { id, ...product.data() } : null
    }
}