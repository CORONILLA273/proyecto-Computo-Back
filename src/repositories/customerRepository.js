import ICustomerRepository from '../interfaces/ICustomerRepository.js'
import { db } from '../config/firebase.js'

export default class CustomerRepository extends ICustomerRepository {
    constructor() {
        super()
        this.collection = db.collection('customers')
    }

    async addCustomer(customer) {
        const newCustomer = await this.collection.add(customer)
        return { id: newCustomer.id, ...customer }
    }

    async updateCustomer(id, updateCustomer) {
        await this.collection.doc(id).update(updateCustomer)
        return { id, ...updateCustomer }
    }

    async deleteCustomer(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Customer Deleted'}
    }
    
    async getAllCustomers() {
        const customers = await this.collection.get()
        return customers.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getCustomerById(id) {
        const customer = await this.collection.doc(id).get()
        return customer.exists ? { id, ...customer.data() } : null
    }

    async toggleCustomerStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}