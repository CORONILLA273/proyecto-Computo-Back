import EmployeeRepository from '../repositories/employeeRepository.js'
import { Employee } from '../models/Employee.js'

export default class EmployeeService {
    constructor() {
        this.employeeRepository = new EmployeeRepository()
    }

    async getAllEmployees() {
        return await this.employeeRepository.getAllEmployees()
    }

    async addEmployee(employeeData) {
        const newEmployee = new Employee({ ...employeeData })
        console.log(newEmployee)
        return this.employeeRepository.addEmployee({ ...newEmployee })
    }

    async updateEmployee(id, employeeData) {
        const updateEmployee = await this.employeeRepository.getEmployeeById(id)
        if(!updateEmployee) {
            throw { message: 'Employee Not Found', statusCode: 404 }
        }

        const updatedEmployee = new Employee({ ...updateEmployee, ...employeeData })
        return this.employeeRepository.updateEmployee(id, { ...updatedEmployee })
    }

    async deleteEmployee(id) {
        const deleteEmployee = await this.employeeRepository.deleteEmployee(id)
        if (!deleteEmployee) {
            throw { message: 'Employee Not Found', statusCode: 404 }
        }
        return this.employeeRepository.deleteEmployee(id)
    }

    async toggleEmployeeStatus(id, newStatus) {
        const toggleEmployeeStatus = await this.employeeRepository.getEmployeeById(id)
        if (!toggleEmployeeStatus) {
            throw { message: 'Employee Not Found', statusCode: 404 }
        }
        return this.employeeRepository.toggleEmployeeStatus(id, newStatus)
    }

    async getEmployeeByName(fullName) {
        const employee = await this.employeeRepository.getEmployeeByName(fullName)
        if (!employee) {
            throw { message: 'Employee Not Found', statusCode: 404 }
        }
        return employee
    }
}