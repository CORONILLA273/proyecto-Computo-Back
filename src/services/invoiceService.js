import InvoiceRepository from '../repositories/invoiceRepository.js'
import { Invoice } from '../models/Invoice.js'

export default class InvoiceService {
    constructor() {
        this.invoiceRepository = new InvoiceRepository()
    }

    async getAllInvoices() {
        return await this.invoiceRepository.getAllInvoices()
    }

    async addInvoice(InvoiceData) {

        const newInvoice = new Invoice({ ...InvoiceData })
        return this.invoiceRepository.addInvoice({ ...newInvoice })
    }

    async updateInvoice(id, invoiceData) {
        const updateInvoice = await this.invoiceRepository.getInvoiceById(id)
        if(!updateInvoice) {
            throw { message: 'Invoice Not Found', statusCode: 404 }
        }

        const updatedInvoice = new Invoice({ ...updateInvoice, ...invoiceData })
        return this.invoiceRepository.updateInvoice(id, { ...updatedInvoice })
    }

    async deleteInvoice(id) {
        const deleteInvoice = await this.invoiceRepository.deleteInvoice(id)
        if (!deleteInvoice) {
            throw { message: 'Invoice Not Found', statusCode: 404 }
        }
        return this.invoiceRepository.deleteInvoice(id)
    }

    async toggleInvoiceStatus(id, newStatus) {
            const toggleInvoiceStatus = await this.invoiceRepository.getInvoiceById(id)
            if (!toggleInvoiceStatus) {
                throw { message: 'Invoice Not Found', statusCode: 404 }
            }
            return this.invoiceRepository.toggleInvoiceStatus(id, newStatus)
        }
}