export class Store {
    constructor({ storeName, contactName, location, capacity, number, email, state, pinCode, address, status }){
        this.storeName = storeName
        this.contactName = contactName
        this.location = location
        this.capacity = capacity
        this.number = number
        this.email = email
        this.state = state
        this.pinCode = pinCode
        this.address = address
        this.status = status
    }
}