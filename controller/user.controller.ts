import User from "../models/user.model";
import {UserClass} from "../clases/user.class";
import {PasswordInvalidException} from "../exceptions/password-invalid.exception";


export class UserController {

    private currentUser: User;

    constructor(currentUser: User) {
        this.currentUser = currentUser;
    }

    async get(currentUserId: number) {
        const userClass = new UserClass(this.currentUser.email);
        await userClass.findById(currentUserId);
        return await userClass.getUser();
    }


    async changePassword(oldPassword: string, newPassword: string) {
        console.log('entra al controller', this.currentUser.email);
        const userClass = new UserClass(this.currentUser.email);
        console.log('pasa')
        const userId = this.currentUser.id;
        console.log(userId, 'userId');
        await userClass.findById(userId);
        console.log('encuentra el user')
        const passwordVerified = await userClass.isValidPassword(oldPassword);
        if (!passwordVerified) {
            throw new PasswordInvalidException().getError();
        }
        console.log('valida el password')
        await userClass.changePassword(newPassword);

    }

    async setLocation(latitude: number, longitude: number) {
        const userClass = new UserClass(this.currentUser.email);
        const userId = this.currentUser.id;
        await userClass.findById(userId);
        await userClass.setLocation(latitude, longitude);
    }

    
    async uploadDocumentFrontImage(documentFrontImage: any) {
        const userClass = new UserClass(this.currentUser.email);
        const userId = this.currentUser.id;
        await userClass.findById(userId);
            await userClass.setDocumentFrontImage(documentFrontImage);
    }

    async uploadDocumentBackImage(documentBackImage: any) {
        const userClass = new UserClass(this.currentUser.email);
        const userId = this.currentUser.id;
        await userClass.findById(userId);
            await userClass.setDocumentBackImage(documentBackImage);
    }

}