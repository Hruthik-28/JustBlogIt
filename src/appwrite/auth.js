import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account; 

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            // console.log(userAccount);
            if (userAccount) {
                //call Another method
                await this.login({email, password})
                return true
            }else {
                console.log("Failed to create account please try again")
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount :: error", error);
            return false
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite Service :: login :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            return user
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
        }

        return null
    }

    async logout() {
        try {
            await this.account.deleteSessions('current')
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService
