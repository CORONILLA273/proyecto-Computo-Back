import PaymentService from '../services/paymentService.js'

export default class PaymentController {
    constructor() {
        this.paymentService = new PaymentService()
    }

    async getAllPayments(req, res, next) {
        try {
            const payments = await this.paymentService.getAllPayments()
            res.status(200).json(payments)
        } catch (error) {
            next(error)
        }
    }

    async addPayment(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const payment = await this.paymentService.addPayment(req.body)
            res.status(201).json(payment)
        } catch (error) {
            next(error)
        }
    }

    async updatePayment(req, res, next) {
        try {
            const payment = await this.paymentService.updatePayment(req.params.id, req.body)
            res.status(200).json(payment)
        } catch (error) {
            next(error)
        }
    }

    async deletePayment(req, res, next) {
        try {
            await this.paymentService.deletePayment(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async togglePaymentStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const payment = await this.paymentService.togglePaymentStatus(req.params.id, req.body.status)
                res.status(200).json(payment)
            } catch (error) {
                next(error)
            }
        }
}