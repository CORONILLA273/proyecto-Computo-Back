import DepartmentRepository from '../repositories/departmentRepository.js'
import { Department } from '../models/Department.js'

export default class DepartmentService {
    constructor() {
        this.departmentRepository = new DepartmentRepository()
    }

    async getAllDepartments() {
        return await this.departmentRepository.getAllDepartments()
    }

    async addDepartment(departmentData) {
        const newDepartment = new Department({ ...departmentData })
        return this.departmentRepository.addDepartment({ ...newDepartment })
    }

    async updateDepartment(id, departmentData) {
        const updateDepartment = await this.departmentRepository.getDepartmentById(id)
        if(!updateDepartment) {
            throw { message: 'Department Not Found', statusCode: 404 }
        }

        const updatedDepartment = new Department({ ...updateDepartment, ...departmentData })
        return this.departmentRepository.updateDepartment(id, { ...updatedDepartment })
    }

    async deleteDepartment(id) {
        const deleteDepartment = await this.departmentRepository.deleteDepartment(id)
        if (!deleteDepartment) {
            throw { message: 'Department Not Found', statusCode: 404 }
        }
        return this.departmentRepository.deleteDepartment(id)
    }

    async toggleDepartmentStatus(id, newStatus) {
        const toggleDepartmentStatus = await this.departmentRepository.getDepartmentById(id)
        if (!toggleDepartmentStatus) {
            throw { message: 'Department Not Found', statusCode: 404 }
        }
        return this.departmentRepository.toggleDepartmentStatus(id, newStatus)
    }
}