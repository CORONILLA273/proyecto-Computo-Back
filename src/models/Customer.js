export class Customer {
    constructor({ fullName, phoneNumber, email, state, pincode, address, status }) {
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.email = email
        this.state = state
        this.pincode = pincode
        this.address = address
        this.status = status
    }
}