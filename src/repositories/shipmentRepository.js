import IShipmentRepository from '../interfaces/IShipmentRepository.js'
import { db } from '../config/firebase.js'

export default class ShipmentRepository extends IShipmentRepository {
    constructor() {
        super()
        this.collection = db.collection('shipments')
    }

    async addShipment(shipment) {
        const newShipment = await this.collection.add(shipment)
        return { id: newShipment.id, ...shipment }
    }

    async updateShipment(id, updateShipment) {
        await this.collection.doc(id).update(updateShipment)
        return { id, ...updateShipment }
    }

    async deleteShipment(id) {
        await this.collection.doc(id).delete()
        return { id, message: 'Shipment Deleted'}
    }
    
    async getAllShipments() {
        const shipments = await this.collection.get()
        return shipments.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }

    async getShipmentById(id) {
        const shipment = await this.collection.doc(id).get()
        return shipment.exists ? { id, ...shipment.data() } : null
    }

    async toggleShipmentStatus(id, newStatus) {
        console.log('@@@ id => ', id)
        console.log('@@@ newStatus => ', newStatus)
        await this.collection.doc(id).update({ status: newStatus })
        return { id, newStatus }
    }
}