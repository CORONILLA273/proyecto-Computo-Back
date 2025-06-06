export class Sale {
    constructor({ orderedDate, customerId, total, status}){
        this.orderedDate = orderedDate
        this.customerId = customerId
        this.total = total
        this.status = status
    }
}