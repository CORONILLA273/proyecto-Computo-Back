import DepartmentService from '../services/departmentService.js'

export default class DepartmentController {
    constructor() {
        this.departmentService = new DepartmentService()
    }

    async getAllDepartments(req, res, next) {
        try {
            const departments = await this.departmentService.getAllDepartments()
            res.status(200).json(departments)
        } catch (error) {
            next(error)
        }
    }

    async addDepartment(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const department = await this.departmentService.addDepartment(req.body)
            res.status(201).json(department)
        } catch (error) {
            next(error)
        }
    }

    async updateDepartment(req, res, next) {
        try {
            const department = await this.departmentService.updateDepartment(req.params.id, req.body)
            res.status(200).json(department)
        } catch (error) {
            next(error)
        }
    }

    async deleteDepartment(req, res, next) {
        try {
            await this.departmentService.deleteDepartment(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleDepartmentStatus(req, res, next) {
        try {
            console.log('@@@ id => ', req.params.id)
            console.log('@@@ status => ', req.body.status)
            const department = await this.departmentService.toggleDepartmentStatus(req.params.id, req.body.status)
            res.status(200).json(department)
        } catch (error) {
            next(error)
        }
    }
}