import ICategoryRepository from '../interfaces/ICategoryRepository.js'
import { db } from '../config/firebase.js'

export default class CategoryRepository extends ICategoryRepository {
    constructor() {
        super()
        this.collection = db.collection('categories')
    }

    async addCategory(category) {
        const newCategory = await this.collection.add(category)
        return { id: newCategory.id, ...category }
    }

    async updateCategory(id, updateCategory) {
        await this.collection.doc(id).update(updateCategory)
        return { id, ...updateCategory }
    }

    async deleteCategory(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Category Deleted'}
    }
    
    async getAllCategories() {
        const categories = await this.collection.get()
        return categories.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async findCategoryByName(categoryName) {
        const category = await this.collection.where('categoryName', '==', categoryName).get()
        return category.empty ? null : category.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))[0]
    }

    async getCategoryById(id) {
        const category = await this.collection.doc(id).get()
        return category.exists ? { id, ...category.data() } : null
    }

    async toggleCategoryStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}