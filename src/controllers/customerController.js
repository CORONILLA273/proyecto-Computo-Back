import CustomerService from '../services/customerService.js'

export default class CustomerController {
    constructor() {
        this.customerService = new CustomerService()
    }

    async getAllCustomers(req, res, next) {
        try {
            const customers = await this.customerService.getAllCustomers()
            res.status(200).json(customers)
        } catch (error) {
            next(error)
        }
    }

    async addCustomer(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const customer = await this.customerService.addCustomer(req.body)
            res.status(201).json(customer)
        } catch (error) {
            next(error)
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const customer = await this.customerService.updateCustomer(req.params.id, req.body)
            res.status(200).json(customer)
        } catch (error) {
            next(error)
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            await this.customerService.deleteCustomer(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleCustomerStatus(req, res, next) {
        try {
            console.log('@@@ id => ', req.params.id)
            console.log('@@@ status => ', req.body.status)
            const customer = await this.customerService.toggleCustomerStatus(req.params.id, req.body.status)
            res.status(200).json(customer)
        } catch (error) {
            next(error)
        }
    }
}