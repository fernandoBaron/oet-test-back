import {Request, Response, Router} from "express";
import Server from "../server/server";
import {tokenVerify} from "../middlewares/auth.middleware";

import {SecurityController} from "../controller/security.controller";
import {FieldNotSentException} from "../exceptions/field-not-sent.exception";
import { PasswordNotAllowedException } from '../exceptions/password-not-allowed.exception';


const securityRouter = Router();

securityRouter.post('/signup', async (req: Request, res: Response ) => {
    const body = req.body;
    const firstname = body.firstname;
    if (!firstname) {
        const exceptionError = new FieldNotSentException('firstname').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const lastname = body.lastname;
    if (!lastname) {
        const exceptionError = new FieldNotSentException('lastname').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const identification = body.identification;
    if (!identification) {
        const exceptionError = new FieldNotSentException('identification').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const identificationType = body.identificationType;
    if (!identificationType) {
        const exceptionError = new FieldNotSentException('identificationType').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const email = body.email;
    if (!email) {
        const exceptionError = new FieldNotSentException('email').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const phone = body.phone;
    if (!phone) {
        const exceptionError = new FieldNotSentException('phone').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    
    const securityController = new SecurityController();
    try {
        await securityController.signUp(firstname, lastname, identification,
                                     identificationType, email, phone);
        return res.status(200)
            .json({
                ok: true,
                err: null,
                message: 'User created successfully',
            });
    } catch (e: any) {
        return res.status(e.code | 400)
            .json(e);
    }
});

securityRouter.post('/login', async (req: Request, res: Response ) => {
    console.log('entra');
    const email = req.body.email;
    if (!email) {
        const exceptionError = new FieldNotSentException('email').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }
    const password = req.body.password;
    if (!password) {
        const exceptionError = new FieldNotSentException('password').getError();
        return res.status(<number>exceptionError.code)
            .json(exceptionError);
    }

    const securityController = new SecurityController();
    try {
        const response: any = await securityController.login(email, password);
        return res.status(200)
            .json({
                ok: true,
                err: null,
                token: response.token,
                user: response.user,
            })
    } catch (e: any) {
        return res.status(e.code)
            .json({
                ok: false,
                err: 'Invalid credentials',
                message: 'Credenciales inválidas'
            });
    }

});

securityRouter.post('/checkToken', tokenVerify, async (req: Request, res: Response ) => {

    console.log('validaToken')
    return res.status(200)
            .json({
                ok: true,
                err: 'Valid token',
                message: 'Token válido',
            })
        ;
});

export default securityRouter;
