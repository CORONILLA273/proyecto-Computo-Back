import CategoryService from '../services/categoryService.js'

export default class CategoryController {
    constructor() {
        this.categoryService = new CategoryService()
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await this.categoryService.getAllCategories()
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    async addCategory(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const category = await this.categoryService.addCategory(req.body)
            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req, res, next) {
        try {
            const category = await this.categoryService.updateCategory(req.params.id, req.body)
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req, res, next) {
        try {
            await this.categoryService.deleteCategory(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleCategoryStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const category = await this.categoryService.toggleCategoryStatus(req.params.id, req.body.status)
                res.status(200).json(category)
            } catch (error) {
                next(error)
            }
        }
}