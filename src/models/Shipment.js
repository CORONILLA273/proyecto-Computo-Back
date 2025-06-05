export class Shipment {
    constructor({ shippedDate, saleId, trackingId, status }){
        this.shippedDate = shippedDate
        this.saleId = saleId
        this.trackingId = trackingId
        this.status = status
    }
}