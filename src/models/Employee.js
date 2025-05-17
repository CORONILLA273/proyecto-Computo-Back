export class Employee {
    constructor({ fullName, hiringDate, phoneNumber, warehouse, departmentID, email, governmentID, state, pincode, address, status}) {
        this.fullName = fullName
        this.hiringDate = hiringDate
        this.phoneNumber = phoneNumber
        this.warehouse = warehouse
        this.departmentID = departmentID
        this.email = email
        this.governmentID = governmentID
        this.state = state
        this.pincode = pincode
        this.address = address
        this.status = status
    }
}