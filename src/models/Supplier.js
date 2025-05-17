export class Supplier {
    constructor ({ fullName, contactName, phoneNumber, emailId, state, pinCode, address, active = true }) {
        this.fullName = fullName
        this.contactName = contactName
        this.phoneNumber = phoneNumber
        this.emailId = emailId
        this.state = state
        this.pinCode = pinCode
        this.address = address
        this.active = active
    }
}