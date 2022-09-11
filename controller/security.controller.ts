import {UserClass} from "../clases/user.class";
import {InvalidCredentialsException} from "../exceptions/invalid-credentials.exception";
import { UserExistException } from '../exceptions/user-exist.exception';

export class SecurityController {

    constructor() {
    }

    async signUp(firstname: string, lastname: string, identification: number,
        identificationType: string, email: string, phone: number) {
        const userClass = new UserClass('system');
        try {
            await userClass.findByEmail(email);
        } catch (e) {
                await userClass.addNewUser(firstname, lastname, identification, 
                    identificationType, email, phone);
                    console.log('pasa el add');
                await userClass.getUser();
                return userClass.sendPasswordEmail();
        }
        throw new UserExistException().getError();
    }

    async login(email: string, password: string) {
        const userClass = new UserClass('system');
            await userClass.findByEmail(email);
        const isValidPassword = await userClass.isValidPassword(password);
        if (!isValidPassword) {
            throw new InvalidCredentialsException().getError();
        }
        const token = await userClass.generateLoginToken();
        return { token: token, user: userClass.getFullName() };    
    }

}
