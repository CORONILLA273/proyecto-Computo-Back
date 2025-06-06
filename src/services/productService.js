import ProductRepository from '../repositories/productRepository.js'
import { Products } from '../models/Products.js'

export default class ProductService {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    async getAllProducts() {
        return await this.productRepository.getAllProducts()
    }

    async addProduct(productData) {
        const { productName } = productData

        // Verificar que sea producto único
        const uniqueProduct = await this.productRepository.findProductByName(productName)
        if (uniqueProduct) {
            throw { message: 'The Product Is Already Exists', statusCode: 400 }
        }

        const newProduct = new Products({ ...productData })
        return this.productRepository.addProduct({ ...newProduct })
    }

    async updateProduct(id, productData) {
        const updateProduct = await this.productRepository.getProductById(id)
        if(!updateProduct) {
            throw { message: 'Product Not Found', statusCode: 404 }
        }

        const updatedProduct = new Products({ ...updateProduct, ...productData })
        return this.productRepository.updateProduct(id, { ...updatedProduct })
    }

    async deleteProduct(id) {
        const deleteProduct = await this.productRepository.deleteProduct(id)
        if (!deleteProduct) {
            throw { message: 'Product Not Found', statusCode: 404 }
        }
        return this.productRepository.deleteProduct(id)
    }

    async getProductById(id) {
        const product = await this.productRepository.getProductById(id)
        if (!product) {
            throw { message: 'Product Not Found', statusCode: 404 }
        }
        return product
    }
}