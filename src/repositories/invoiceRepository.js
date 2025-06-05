import IInvoiceRepository from '../interfaces/IInvoiceRepository.js'
import { db } from '../config/firebase.js'

export default class InvoiceRepository extends IInvoiceRepository {
    constructor() {
        super()
        this.collection = db.collection('invoices')
    }

    async addInvoice(invoice) {
        const newInvoice = await this.collection.add(invoice)
        return { id: newInvoice.id, ...invoice }
    }

    async updateInvoice(id, updateInvoice) {
        await this.collection.doc(id).update(updateInvoice)
        return { id, ...updateInvoice }
    }

    async deleteInvoice(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Invoice Deleted'}
    }
    
    async getAllInvoices() {
        const invoices = await this.collection.get()
        return invoices.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getInvoiceById(id) {
        const invoice = await this.collection.doc(id).get()
        return invoice.exists ? { id, ...invoice.data() } : null
    }

    async toggleInvoiceStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}