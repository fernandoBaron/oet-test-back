import {CriptoHelper} from "../helper/cripto.helper";
import {CommonHelper} from "../helper/common.helper";
import {UserNotFoundException} from "../exceptions/user-not-found.exception";
import bcrypt from "bcrypt";
import {TOKEN_SEED} from "../global/environment";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { GeneralExceptionNotFoundException } from '../exceptions/general-exception-not-found.exception';
import { UnexpectedErrorException } from '../exceptions/unexpected-error.exception';
import { UploadedFile } from "express-fileupload";
import { EmailNotSendException } from '../exceptions/email-not-send.exception';
import { Mailer } from "../server/mailer";

export class UserClass {

    private user: User | undefined | null;
    private readonly currentUserEmail: string;

    constructor(currentUserEmail: string) {
        this.currentUserEmail = currentUserEmail;
    }

    //Finders

    public async findById(userId: any) {
        const user = await User.findOne({
            where: {
                id: userId
            },
        });
        if (!user) {
            throw new UserNotFoundException().getError();
        }
        try {
            this.user = user;
        }catch (e) {
            console.log(e)
        }
    }

    async findByEmail(email: string) {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new UserNotFoundException().getError();
        }
        this.user = user;
    }

    //Getters

    getId(): number {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        return <number>this.user.id;
    }

    async getUser() {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        return this.user;
    }

    getFullName() {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        return this.user.firstname + ' ' + this.user.lastname;
    }

    //Validations 

    async isValidPassword(password: string) {
        return new Promise(async (resolve, reject) => {
            if (!this.user) {
                throw new UserNotFoundException().getError();
            }
            const criptoHelper = new CriptoHelper();
            const isValidPassword = await criptoHelper.decode(password, this.user.password);
            resolve(isValidPassword);
        });
    }

    //Functionality

    async addNewUser(firstname: string, lastname: string, identification: number,
        identificationType: string, email: string, phone: number) {
        const user = await User.build({
            firstname: firstname,
            lastname: lastname,
            identification: identification,
            identificationType: identificationType,
            email: email,
            phone: phone,
            createdBy: email,
            createdAt: new Date(),
        });
        try {
            await user.save();
            this.user = user
        } catch (e) {
            throw new GeneralExceptionNotFoundException(e).getError();
        }
    }

    async generateLoginToken() {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        return jwt.sign({userDB: this.user}, TOKEN_SEED, {expiresIn: 31104000});
    }

    async changePassword(newPassword: any) {
        console.log('entra al change')
        return new Promise((resolve, reject) => {
                bcrypt.hash(newPassword, 10, async (err, result) => {
                    if (!this.user) {
                        throw new UserNotFoundException().getError();
                    }
                    this.user.password = result;
                    this.user.save();
                    resolve(true);
                });
            }
        );
    }

    async setLocation(latitude: number, longitude: number) {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
            this.user.latitude = latitude;
            this.user.longitude = longitude;
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
            await this.user.save();
    }

    async setDocumentFrontImage(documentFrontImage: UploadedFile) {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        const folder = 'uploads/documents/'
            this.user.documentFrontImage = await this.uploadNewFile(documentFrontImage, folder);
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
            await this.user.save();
    }

    async setDocumentBackImage(documentBackImage: UploadedFile) {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        const folder = 'uploads/documents/'
            this.user.documentBackImage = await this.uploadNewFile(documentBackImage, folder);
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
            await this.user.save();
    }

    async uploadNewFile(image: UploadedFile, folder: string){
        const filename = image.name;
            const filenameArray = filename.split(".");
            const cryptoHelper = new CriptoHelper();
            const hashName = cryptoHelper.getHashHex();
            const newName = hashName + '.' + filenameArray[filenameArray.length - 1];
            return new Promise(async(resolve, reject) => {
                image.mv(`${folder}` + newName, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(newName);
                    }
                });
            });
    }
       

    async sendPasswordEmail() {
        if (!this.user) {
            throw new UserNotFoundException().getError();
        }
        const commonHelperEmail = new CommonHelper();
        const newPassword = this.user.firstname + commonHelperEmail.generateNumberBetween(100000, 999999);
        const cryptoHelper = new CriptoHelper();
        let userPassword;
        try {
            userPassword = await cryptoHelper.encode(newPassword);
        } catch (e) {
            throw new UnexpectedErrorException().getError();
        }
        this.user.password = userPassword;
        await this.user.save();
        const to = this.user.email;
        const subject = 'Contraseña del Test de Evaluación';
        const html = `
            <h1>Credenciales de Ingreso</h1>
            <p>
            Este es su usuario y contraseña de Ingreso al App:
            </p>
            <h2>USUARIO:    ${this.user.email}</h2>
            <h2>CONTRASEÑA: ${newPassword}</h2>
            <p>
            Por favor ingrese al app e ingrese sus credenciales.
            </p>
            <p>
                Cordialmente,
            </p>
            <br>
            <br>
            <br>
            <p>
            Fernando Alberto Barón Alfonso <br>
            Nuevo Fichaje OetGroup
            </p>
    
    `;
        const text = `
    Credenciales de Ingreso
    
    Este es su usuario y contraseña de Ingreso al App:
    USUARIO:    ${this.user.email}
    CONTRASEÑA: ${newPassword}
    
    Por favor ingrese al app e ingrese sus credenciales.
    
    
    Cordialmente,
    
    
    Fernando Alberto Barón Alfonso 
    Nuevo Fichaje OetGroup
    `;
        const mail = new Mailer();
        try {
            await mail.sendMail(to, subject, html, text);
        } catch (e) {
            throw new EmailNotSendException().getError();
        }
    };

}

