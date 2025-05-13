import ProductService from '../services/productService.js'

export default class ProductController {
    constructor() {
        this.productService = new ProductService()
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await this.productService.getAllProducts()
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    async addProduct(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const product = await this.productService.addProduct(req.body)
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body)
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            await this.productService.deleteProduct(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }
}