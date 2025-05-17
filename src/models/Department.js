export class Department {
    constructor({ departmentName, creationDate, manager, managerID ,managerEmail, managerPhoneNumber ,warehouse, status }) {
        this.departmentName = departmentName
        this.creationDate = creationDate
        this.manager = manager
        this.managerID = managerID
        this.managerEmail = managerEmail
        this.managerPhoneNumber = managerPhoneNumber
        this.warehouse = warehouse
        this.status = status
    }
}