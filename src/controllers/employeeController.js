import EmployeeService from '../services/employeeService.js'

export default class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService()
    }
    
    async getAllEmployees(req, res, next) {
        try {
            const employees = await this.employeeService.getAllEmployees()
            res.status(200).json(employees)
        } catch (error) {
            next(error)
        }
    }

    async addEmployee(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const employee = await this.employeeService.addEmployee(req.body)
            res.status(201).json(employee)
        } catch (error) {
            next(error)
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const employee = await this.employeeService.updateEmployee(req.params.id, req.body)
            res.status(200).json(employee)
        } catch (error) {
            next(error)
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            await this.employeeService.deleteEmployee(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleEmployeeStatus(req, res, next) {
        try {
            console.log('@@@ id => ', req.params.id)
            console.log('@@@ status => ', req.body.status)
            const employee = await this.employeeService.toggleEmployeeStatus(req.params.id, req.body.status)
            res.status(200).json(employee)
        } catch (error) {
            next(error)
        }
    }
}