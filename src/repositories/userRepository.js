import IUserRepository from "../interfaces/IUserRepository.js"
import { db } from "../config/firebase.js";

export default class UserRepository extends IUserRepository {

    constructor() {
        super()
        this.collection = db.collection('users')
    }

    async create(user) {
        const userCreated = await this.collection.add(user)

        return {
            id: userCreated.id,
            ...user
        }
    }
    
    async getAll() {
        const users = await this.collection.get()
        return users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    } 
    
    async findByFullname(fullName) {
        const user = await this.collection
            .where('fullName', '==', fullName).get()      
        
        return user.empty ? null : { id: user.docs[0].id, ...user.docs[0].data() } 
    }

    async findByEmail(email) {
        const user = await this.collection
            .where('email', '==', email).get()      
        
        return user.empty ? null : { id: user.docs[0].id, ...user.docs[0].data() } 
    }
    
    async findByFullname(fullName) {
        const user = await this.collection
            .where('fullName', '==', fullName).get()      
        
        return user.empty ? null : { id: user.docs[0].id, ...user.docs[0].data() } 
    } 
    
    async updateSessionToken(userId, sessionToken) {
        const user = this.collection.doc(userId)
        await user.update({ currentSessionToken: sessionToken })
    }

    async getSessionToken(userId) {
        const user = this.collection.doc(userId)
        const userLogged = await user.get()
        return userLogged.exists ? userLogged.data().currentSessionToken : null
    }

    async findByUser(user) {
        const usuario = await this.collection.where('usuario' , '==', user).get()   
        
        return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() } 
    }
}