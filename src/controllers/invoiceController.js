import InvoiceService from '../services/invoiceService.js'

export default class InvoiceController {
    constructor() {
        this.invoiceService = new InvoiceService()
    }

    async getAllInvoices(req, res, next) {
        try {
            const invoices = await this.invoiceService.getAllInvoices()
            res.status(200).json(invoices)
        } catch (error) {
            next(error)
        }
    }

    async addInvoice(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const invoice = await this.invoiceService.addInvoice(req.body)
            res.status(201).json(invoice)
        } catch (error) {
            next(error)
        }
    }

    async updateInvoice(req, res, next) {
        try {
            const invoice = await this.invoiceService.updateInvoice(req.params.id, req.body)
            res.status(200).json(invoice)
        } catch (error) {
            next(error)
        }
    }

    async deleteInvoice(req, res, next) {
        try {
            await this.invoiceService.deleteInvoice(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleInvoiceStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const invoice = await this.invoiceService.toggleInvoiceStatus(req.params.id, req.body.status)
                res.status(200).json(invoice)
            } catch (error) {
                next(error)
            }
        }
}