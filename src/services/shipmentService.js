import ShipmentRepository from '../repositories/shipmentRepository.js'
import { Shipment } from '../models/Shipment.js'

export default class ShipmentService {
    constructor() {
        this.shipmentRepository = new ShipmentRepository()
    }

    async getAllShipments() {
        return await this.shipmentRepository.getAllShipments()
    }

    async addShipment(shipmentData) {

        const newShipment = new Shipment({ ...shipmentData })
        return this.shipmentRepository.addShipment({ ...newShipment })
    }

    async updateShipment(id, shipmentData) {
        const updateShipment = await this.shipmentRepository.getShipmentById(id)
        if(!updateShipment) {
            throw { message: 'Shipment Not Found', statusCode: 404 }
        }

        const updatedShipment = new Shipment({ ...updateShipment, ...shipmentData })
        return this.shipmentRepository.updateShipment(id, { ...updatedShipment })
    }

    async deleteShipment(id) {
        const deleteShipment = await this.shipmentRepository.deleteShipment(id)
        if (!deleteShipment) {
            throw { message: 'Shipment Not Found', statusCode: 404 }
        }
        return this.shipmentRepository.deleteShipment(id)
    }

    async toggleShipmentStatus(id, newStatus) {
            const toggleShipmentStatus = await this.shipmentRepository.getShipmentById(id)
            if (!toggleShipmentStatus) {
                throw { message: 'Shipment Not Found', statusCode: 404 }
            }
            return this.shipmentRepository.toggleShipmentStatus(id, newStatus)
        }
}