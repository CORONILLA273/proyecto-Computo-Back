export class Purchase {
    constructor({ orderedDate, supplierId, status, productId, quantity, priceUnit, totalPrice }) {
        this.orderedDate = orderedDate
        this.supplierId = supplierId
        this.status = status
        this.productId = productId
        this.quantity = quantity
        this.priceUnit = priceUnit
        this.totalPrice = totalPrice
    }
}