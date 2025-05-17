import IEmployeeRepository from '../interfaces/IEmployeeRepository.js'
import { db } from '../config/firebase.js'

export default class EmployeeRepository extends IEmployeeRepository {
    constructor() {
        super()
        this.collection = db.collection('employees')
    }

    async addEmployee(employee) {
        const newEmployee = await this.collection.add(employee)
        return { id: newEmployee.id, ...employee }
    }

    async updateEmployee(id, updateEmployee) {
        await this.collection.doc(id).update(updateEmployee)
        return { id, ...updateEmployee }
    }

    async deleteEmployee(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Employee Deleted'}
    }
    
    async getAllEmployees() {
        const employees = await this.collection.get()
        return employees.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getEmployeeByName(fullName) {
        const employee = await this.collection.where('fullName', '==', fullName).get()
        return employee.empty ? null : employee.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))[0]
    }

    async toggleEmployeeStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}