import IDepartmentRepository from '../interfaces/IDepartmentRepository.js'
import { db } from '../config/firebase.js'

export default class DepartmentRepository extends IDepartmentRepository {
    constructor() {
        super()
        this.collection = db.collection('departments')
    }

    async addDepartment(department) {
        const newDepartment = await this.collection.add(department)
        return { id: newDepartment.id, ...department }
    }

    async updateDepartment(id, updateDepartment) {
        await this.collection.doc(id).update(updateDepartment)
        return { id, ...updateDepartment }
    }

    async deleteDepartment(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Department Deleted'}
    }
    
    async getAllDepartments() {
        const departments = await this.collection.get()
        return departments.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getDepartmentById(id) {
        const department = await this.collection.doc(id).get()
        return department.exists ? { id, ...department.data() } : null
    }

    async toggleDepartmentStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}