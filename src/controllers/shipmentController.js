import ShipmentService from '../services/shipmentService.js'

export default class ShipmentController {
    constructor() {
        this.shipmentService = new ShipmentService()
    }

    async getAllShipments(req, res, next) {
        try {
            const shipments = await this.shipmentService.getAllShipments()
            res.status(200).json(shipments)
        } catch (error) {
            next(error)
        }
    }

    async addShipment(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const shipment = await this.shipmentService.addShipment(req.body)
            res.status(201).json(shipment)
        } catch (error) {
            next(error)
        }
    }

    async updateShipment(req, res, next) {
        try {
            const shipment = await this.shipmentService.updateShipment(req.params.id, req.body)
            res.status(200).json(shipment)
        } catch (error) {
            next(error)
        }
    }

    async deleteShipment(req, res, next) {
        try {
            await this.shipmentService.deleteShipment(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleShipmentStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const shipment = await this.shipmentService.toggleShipmentStatus(req.params.id, req.body.status)
                res.status(200).json(shipment)
            } catch (error) {
                next(error)
            }
        }
}