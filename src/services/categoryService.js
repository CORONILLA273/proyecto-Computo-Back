import CategoryRepository from '../repositories/categoryRepository.js'
import { Category } from '../models/Category.js'

export default class CategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    async getAllCategories() {
        return await this.categoryRepository.getAllCategories()
    }

    async addCategory(categoryData) {
        const { categoryName } = categoryData

        // Verificar que sea producto único
        const uniqueCategory = await this.categoryRepository.findCategoryByName(categoryName)
        if (uniqueCategory) {
            throw { message: 'The Category Is Already Exists', statusCode: 400 }
        }

        const newCategory = new Category({ ...categoryData })
        return this.categoryRepository.addCategory({ ...newCategory })
    }

    async updateCategory(id, categoryData) {
        const updateCategory = await this.categoryRepository.getCategoryByiId(id)
        if(!updateCategory) {
            throw { message: 'Category Not Found', statusCode: 404 }
        }

        const updatedCategory = new Category({ ...updateCategory, ...categoryData })
        return this.categoryRepository.updateCategory(id, { ...updatedCategory })
    }

    async deleteCategory(id) {
        const deleteCategory = await this.categoryRepository.deleteCategory(id)
        if (!deleteCategory) {
            throw { message: 'Category Not Found', statusCode: 404 }
        }
        return this.categoryRepository.deleteCategory(id)
    }

    async toggleCategoryStatus(id, newStatus) {
            const toggleCategoryStatus = await this.categoryRepository.getCategoryById(id)
            if (!toggleCategoryStatus) {
                throw { message: 'Category Not Found', statusCode: 404 }
            }
            return this.categoryRepository.toggleCategoryStatus(id, newStatus)
        }
}