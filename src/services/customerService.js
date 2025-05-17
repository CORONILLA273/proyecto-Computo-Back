import CustomerRepository from '../repositories/customerRepository.js'
import { Customer } from '../models/Customer.js'

export default class CustomerService {
    constructor() {
        this.customerRepository = new CustomerRepository()
    }

    async getAllCustomers() {
        return await this.customerRepository.getAllCustomers()
    }

    async addCustomer(customerData) {
        const newCustomer = new Customer({ ...customerData })
        return this.customerRepository.addCustomer({ ...newCustomer })
    }

    async updateCustomer(id, customerData) {
        const updateCustomer = await this.customerRepository.getCustomerById(id)
        if(!updateCustomer) {
            throw { message: 'Customer Not Found', statusCode: 404 }
        }

        const updatedCustomer = new Customer({ ...updateCustomer, ...customerData })
        return this.customerRepository.updateCustomer(id, { ...updatedCustomer })
    }

    async deleteCustomer(id) {
        const deleteCustomer = await this.customerRepository.deleteCustomer(id)
        if (!deleteCustomer) {
            throw { message: 'Customer Not Found', statusCode: 404 }
        }
        return this.customerRepository.deleteCustomer(id)
    }

    async toggleCustomerStatus(id, newStatus) {
        const toggleCustomerStatus = await this.customerRepository.getCustomerById(id)
        if (!toggleCustomerStatus) {
            throw { message: 'Customer Not Found', statusCode: 404 }
        }
        return this.customerRepository.toggleCustomerStatus(id, newStatus)
    }
}