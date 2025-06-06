export class Payment {
    constructor({ orderedDate, purchaseId, totalPrice, status}) {
        this.orderedDate = orderedDate
        this.purchaseId = purchaseId
        this.totalPrice = totalPrice
        this.status = status
    }
}