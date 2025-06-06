import PaymentRepository from '../repositories/paymentRepository.js'
import { Payment } from '../models/Payment.js'

export default class PaymentService {
    constructor() {
        this.paymentRepository = new PaymentRepository()
    }

    async getAllPayments() {
        return await this.paymentRepository.getAllPayments()
    }

    async addPayment(paymentData) {
        
        const newPayment = new Payment({ ...paymentData })
        return this.paymentRepository.addPayment({ ...newPayment })
    }

    async updatePayment(id, paymentData) {
        const updatePayment = await this.paymentRepository.getPaymentById(id)
        if(!updatePayment) {
            throw { message: 'Payment Not Found', statusCode: 404 }
        }

        const updatedPayment = new Payment({ ...updatePayment, ...paymentData })
        return this.paymentRepository.updatePayment(id, { ...updatedPayment })
    }

    async deletePayment(id) {
        const deletePayment = await this.paymentRepository.deletePayment(id)
        if (!deletePayment) {
            throw { message: 'Payment Not Found', statusCode: 404 }
        }
        return this.paymentRepository.deletePayment(id)
    }

    async togglePaymentStatus(id, newStatus) {
            const togglePaymentStatus = await this.paymentRepository.getPaymentById(id)
            if (!togglePaymentStatus) {
                throw { message: 'Payment Not Found', statusCode: 404 }
            }
            return this.paymentRepository.togglePaymentStatus(id, newStatus)
        }
}