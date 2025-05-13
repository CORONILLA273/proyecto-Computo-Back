export class User {
    constructor({fullName, email, password, businessName, industry, domain, product, type, storage_size}) {
        this.fullName = fullName
        this.email = email
        this.password = password
        this.businessName = businessName
        this.industry = industry
        this.domain = domain
        this.product = product
        this.type = type
        this.storage_size = storage_size
    }
}