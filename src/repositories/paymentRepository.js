import IPaymentRepository from '../interfaces/IPaymentRepository.js'
import { db } from '../config/firebase.js'

export default class PaymentRepository extends IPaymentRepository {
    constructor() {
        super()
        this.collection = db.collection('payments')
    }

    async addPayment(payment) {
        const newPayment = await this.collection.add(payment)
        return { id: newPayment.id, ...payment }
    }

    async updatePayment(id, updatePayment) {
        await this.collection.doc(id).update(updatePayment)
        return { id, ...updatePayment }
    }

    async deletePayment(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Payment Deleted'}
    }
    
    async getAllPayments() {
        const payments = await this.collection.get()
        return payments.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getPaymentById(id) {
        const payment = await this.collection.doc(id).get()
        return payment.exists ? { id, ...payment.data() } : null
    }

    async togglePaymentStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}